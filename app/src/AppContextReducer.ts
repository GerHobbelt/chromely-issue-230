import { IAppContext, IAppData, InstallationInfo } from "./AppContext";
import { InstallState, InstallStateType } from "./services/events";
import { ConfigInfo } from "./services/events/ConfigInfo";

export type AppAction =
    { kind: "initialize", config: ConfigInfo } |
    { kind: "update-install-state", state: InstallState };

export const AppContextReducer = (current: IAppContext, action: AppAction) => {
    switch (action.kind) {
        case "initialize": {
            const { isInitialized, config, page, ...rest } = current;

            const newContext: IAppContext = {
                isInitialized: true,
                config: {
                },
                page,
                ...rest
            };
            return newContext;
        }
        case "update-install-state": {
            const { data, ...rest } = current;
            const { installation, installedGameIds, ...restData } = data;

            const newInstallationInfo: InstallationInfo =
                action.state.type !== InstallStateType.Complete
                && action.state.type !== InstallStateType.Cancelled
                && action.state.type !== InstallStateType.Failed
                    ? { inProgress: true, state: action.state }
                    : { inProgress: false };

            if (action.state.type === InstallStateType.Complete
                && action.state.gameId !== null
                && installedGameIds.indexOf(action.state.gameId) === -1) {
                installedGameIds.push(action.state.gameId);
            }

            const newData: IAppData = {
                installation: newInstallationInfo,
                installedGameIds,
                ...restData
            }

            const newContext: IAppContext = {
                data: newData,
                ...rest
            };
            return newContext;
        }
        default:
            return current;
    }
};