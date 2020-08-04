export enum GameStateType {
    Run = 0,
    Stop = 1
}

export interface GameState {
    gameId: string;
    type: GameStateType;
}