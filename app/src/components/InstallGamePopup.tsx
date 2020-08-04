import React, { useCallback, useEffect, useMemo, useState } from "react";
import { defer } from "rxjs";
import { ClientEvent, InstallStateType } from "../services/events";
import { useEvent } from "../services/useEvent";
import { ButtonLink } from "./shared";

export const InstallGamePopup = () => {
    const [isInstalling, setIsInstalling] = useState(false);
    const [installStep, setInstallStep] = useState<"check" | "download" | "install" | "launch">();
    const [isPaused, setIsPaused] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [gameId, setGameId] = useState<string | null>(null);
    const [gameTitle, setGameTitle] = useState<string | null>(null);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        setGameTitle(null);
        if (gameId === null || gameId.length === 0) {
            return;
        }

        const subscription = defer(() => fetch("https://httpbin.org/get")).subscribe({
            next: _ => setGameTitle(gameId),
            error: () => setGameTitle("<game details load failed>")
        });
        return () => subscription.unsubscribe();
    }, [gameId]);

    useEvent(ClientEvent.InstallStateChanged, state => {
        const hasProgress = state.type !== InstallStateType.PrepareToInstall
            && state.type !== InstallStateType.Complete
            && state.type !== InstallStateType.Cancelled;
        setIsInstalling(hasProgress);

        if (!hasProgress) {
            setInstallStep(undefined);
        } else {
            switch (state.type) {
                case InstallStateType.CheckingForUpdates:
                    setInstallStep("check");
                    break;
                case InstallStateType.Download:
                    setInstallStep("download");
                    break;
                case InstallStateType.Install:
                    setInstallStep("install");
                    break;
                case InstallStateType.Launch:
                    setInstallStep("launch");
                    break;
            }
        }

        setIsPaused(state.type === InstallStateType.Paused);
        setIsFailed(state.type === InstallStateType.Failed);
        setGameId(state.gameId);
        setPercent(state.progressPercent);
    }, []);

    const progressText = useMemo(() => {
        let stateText: string | undefined;
        if (isFailed) {
            stateText = "Failed to install";
        } else {
            switch (installStep) {
                case "check":
                    stateText = "Checking for updates";
                    break;
                case "download":
                    stateText = "Downloading";
                    break;
                case "install":
                    stateText = "Installing";
                    break;
                case "launch":
                    stateText = "Launching";
                    break;
            }
        }


        return `${installStep === "check" ? "" : `${Math.floor(percent)}% `}${stateText ?? ""} ${gameTitle ?? ""}`;
    }, [gameTitle, percent, isFailed, installStep]);

    const goToGame = useCallback(() => console.log(), [gameId]);

    return (
        <React.Fragment>
            {isInstalling &&
                <div id="InstallGamePopup" className="popup-bottombar">
                    {installStep !== "check" && (
                        <div className="progressbar">
                            <div
                                className={`progressbar-fill ${isFailed ? "failed" : null}`}
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                    )}
                    <div className="progressbar-info container-fluid" onClick={goToGame}>
                        <div className="row justify-content-between">
                            <div className="col progressbar-label" title={progressText}>
                                {progressText}
                            </div>
                            <div className="col-auto progressbar-control">
                                <ButtonLink
                                    className={`ml-2 ${(isFailed ? "btn-close" : "btn-cancel")}`}
                                >
                                    {isFailed ? "Close" : "Cancel"}
                                </ButtonLink>
                            </div>
                        </div>
                    </div>
                </div>}
        </React.Fragment>
    )
}