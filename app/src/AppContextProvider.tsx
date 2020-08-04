import React, { createContext, useEffect, useReducer } from "react";
import { AppContextInitialState, IAppContext } from "./AppContext";
import { AppAction, AppContextReducer } from "./AppContextReducer";
import { Backend } from "./services/Backend";
import { ClientEvent } from "./services/events";
import { useEvent } from "./services/useEvent";

export const AppContext = createContext<[IAppContext, React.Dispatch<AppAction>]>(
    [AppContextInitialState, null as unknown as React.Dispatch<AppAction>]);

export const AppContextProvider = (props: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(AppContextReducer, AppContextInitialState);

    useEvent(ClientEvent.Configure, config => {
        dispatch({ kind: "initialize", config });
    }, [state.isInitialized]);

    useEvent(ClientEvent.InstallStateChanged, installState =>
        dispatch({ kind: "update-install-state", state: installState }), []);

    useEffect(() => {
        Backend.requestConfig();
    }, []);

    return (
        <React.Fragment>
            <AppContext.Provider value={[state, dispatch]}>
                {props.children}
            </AppContext.Provider>
        </React.Fragment>
    )
};