import classNames from "classnames";
import React, { useCallback, useMemo, useState } from "react";
import { ClientEvent, InstallStateType } from "../../services/events";
import { useEvent } from "../../services/useEvent";
import { useAppContext } from "../../useAppContext";
import { ButtonLink } from "./ButtonLink";

type ButtonState = "not-installed" | "installed" | "installing" | "installed-disabled" | "installing-other";

interface Props {
    gameId: string;
}

export const GameButton = (
    { gameId, className: currentClassName, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & Props) => {

    const [{ data: { installation, installedGameIds } }] = useAppContext();

    const getButtonState = (inProgress: boolean, installingCurrentGame: boolean) => {
        const isInstalled = installedGameIds.indexOf(gameId) !== -1;
        return inProgress
            ? (installingCurrentGame
                ? (isInstalled ? "installed-disabled" : "installing")
                : (isInstalled ? "installed-disabled" : "installing-other"))
            : (isInstalled ? "installed" : "not-installed");
    }

    const [state, setState] = useState<ButtonState>(() => {
        const installingCurrentGame = installation.inProgress && installation.state.gameId === gameId;
        return getButtonState(installation.inProgress, installingCurrentGame);
    });

    useEvent(ClientEvent.InstallStateChanged, installState => {
        const inProgress = installState.type !== InstallStateType.Complete
            && installState.type !== InstallStateType.Failed
            && installState.type !== InstallStateType.Cancelled;
        const installingCurrentGame = installState.gameId === gameId;
        const newState = getButtonState(inProgress, installingCurrentGame);

        setState(newState);
    }, [gameId, state, installedGameIds]);

    console.log(state);

    const text = useMemo(() => {
        switch (state) {
            case "installed":
            case "installed-disabled":
                return <span>Play&nbsp;Now</span>;
            case "installing":
                return <span>Installing...</span>;
            default:
                return <span>Install&nbsp;Game</span>;
        }
    }, [state]);

    const className = useMemo(
        () => classNames(
            state === "installed" || state === "installed-disabled" ? "btn-play-now" : "btn-install-game",
            { disabled: state !== "installed" && state !== "not-installed" },
            state === "installing-other"
                ? "cursor-help"
                : state === "installing" || state === "installed-disabled"
                    ? "cursor-not-allowed"
                    : "cursor-pointer",
            currentClassName?.split(" ").map(c => c.trim()).filter(c => c !== "")),
        [currentClassName, state]);

    return (
        <ButtonLink
            className={className}
            title={state === "installing-other" ? "Wait for another installation to complete." : undefined}
            {...props}
        >
            {text}
        </ButtonLink>
    )
}