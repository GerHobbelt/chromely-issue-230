import { queryString as serviceStackQueryString } from "@servicestack/client";

/**
 * Parses URL query parameters.
 * @param url The URL.
 * @returns The key-value object that contains query parameters.
 */
export const queryString = (url: string) =>
    serviceStackQueryString(url) as { [key: string]: string };

/**
 * Adds or updates the URL query parameters based on input object.
 * @param url The input URL.
 * @param query The URL query parameters.
 * @returns The URL with updated query parameters.
 */
export const makeUrl = (url: string, query: { [name: string]: string }) => {
    const isRelative = url.indexOf("://") === -1;
    const value = new URL(url, isRelative ? "http://fake.url/" : undefined);
    for (const name of Object.keys(query)) {
        value.searchParams.append(name, query[name]);
    }

    return "" + (isRelative ? `${value.pathname}${value.search}${value.hash}` : value);
}