import { defer } from "rxjs";
import { map } from "rxjs/operators";
import { makeUrl } from "../helpers";

const cefQuery = (window as any).cefQuery;

export interface IRequestOptions {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    queryParameters?: { [key: string]: string };
    body?: object;
}

export interface IRequestError {
    error: unknown;
    message: string;
}

export interface IResponse<T> {
    readyState: number;
    statusCode: number;
    result: T;
}

interface IResponseDto {
    ReadyState: number;
    Status: number;
    Data: unknown;
}

let commandLink: HTMLAnchorElement | null = null;
const updateOrAddCommandLink = (): HTMLAnchorElement => {
    if (commandLink !== null) {
        return commandLink;
    }

    commandLink = document.createElement("a");
    document.body.appendChild(commandLink);

    return commandLink;
}

function command(route: string, params?: { [key: string]: string }): void {
    if (route.startsWith("/")) {
        route = route.substring(1);
    }

    const url = makeUrl(`http://command.com/${route}`, params ?? {});
    const link = updateOrAddCommandLink();
    link.href = url;
    link.click();
}

function request<T = void>(options: IRequestOptions): Promise<IResponse<T>> {
    return new Promise<IResponse<T>>((resolve, reject) => {
        if (!options.url.startsWith("/")) {
            options.url = `/${options.url}`;
        }

        const requestData = JSON.stringify({
            method: options.method,
            url: options.url,
            parameters: options.queryParameters,
            postData: options.body
        });

        cefQuery({
            request: requestData,
            onSuccess: (data: string) => {
                const responseDto = JSON.parse(data) as IResponseDto;
                const response: IResponse<T> = {
                    readyState: responseDto.ReadyState,
                    statusCode: responseDto.Status,
                    result: responseDto.Data as T
                };

                // TODO: Ensure that only valid 'ReadyState' if '4'. Try to make an enum for it.
                const success = response.readyState === 4 && response.statusCode >= 200 && response.statusCode <= 299;
                if (success) {
                    resolve(response);
                    return;
                }

                const requestError: IRequestError = {
                    error: response,
                    message: `An error occurred during the request: ${response.statusCode} [${options.method}] `
                        + `${options.url} ReadyState: '${response.readyState}'`
                };
                reject(requestError);
            },
            onFailure: (error: unknown, message: string) => {
                const requestError: IRequestError = {
                    error,
                    message
                };

                reject(requestError);
            }
        });
    });
}

const req = {
    // tslint:disable-next-line: object-literal-shorthand only-arrow-functions Generic required here
    get: function<T>(url: string, queryParameters?: { [key: string]: string }): Promise<IResponse<T>> {
        return request<T>({
            method: "GET",
            url,
            queryParameters
        });
    },
    // tslint:disable-next-line: object-literal-shorthand only-arrow-functions Generic required here
    post: function<T>(url: string, body?: object, queryParameters?: { [key: string]: string }): Promise<IResponse<T>> {
        return request<T>({
            method: "POST",
            url,
            queryParameters,
            body
        });
    },
    // tslint:disable-next-line: object-literal-shorthand only-arrow-functions Generic required here
    put: function<T>(url: string, body?: object, queryParameters?: { [key: string]: string }): Promise<IResponse<T>> {
        return request<T>({
            method: "PUT",
            url,
            queryParameters,
            body
        });
    },
    // tslint:disable-next-line: object-literal-shorthand only-arrow-functions Generic required here
    delete: function<T>(url: string, queryParameters?: { [key: string]: string }): Promise<IResponse<T>> {
        return request<T>({
            method: "DELETE",
            url,
            queryParameters
        });
    }
}

export const Backend = {
    requestConfig: () => command("request-configuration")
}