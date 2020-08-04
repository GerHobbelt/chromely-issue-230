import { InstallStateType } from "./InstallStateType";

export interface InstallState {
    gameId: string | null;
    type: InstallStateType;
    progressPercent: number;
}