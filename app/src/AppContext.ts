import { AppPage } from "./AppPage";
import { Category, Game } from "./models";
import { InstallState } from "./services/events";

export interface IAppConfig {
}

export type DynamicAppData<T> = { isLoaded: false | "error" } | ({
    isLoaded: true,
    lastUpdate: number;
    updateInterval?: number;
} & T);

export type SearchData = DynamicAppData<SearchDataValues>;
export type SearchDataValues = {
    history: string[],
    topGames: Game[]
};

export type GameCenterData = DynamicAppData<GameCenterDataValues>;
export type GameCenterDataValues = {
    gameCategories: Category[],
    discoveryCategories: Category[],
    gamesByCategory: { [categoryId: string]: Game[] }
};

export type InstallationInfo =
    { inProgress: false } |
    { inProgress: true, state: InstallState };

export interface IAppData {
    search: SearchData;
    gameCenter: GameCenterData;
    installation: InstallationInfo;
    installedGameIds: string[];
    recentlyViewedGames: Game[];
    isSearchFocused: boolean;
    isAboutOpen: boolean;
    isSettingsOpen: boolean;
}

export interface IAppContext {
    isInitialized: boolean;
    config: IAppConfig;
    page: AppPage;
    data: IAppData;
}

export const AppContextInitialState: IAppContext = {
    isInitialized: false,
    config: {
        apiUrl: "",
        hwid: "",
        appVersion: "",
        launchOnStartup: false
    },
    page: { name: "category", id: "GAME_ARCADE" },
    data: {
        search: { isLoaded: false },
        gameCenter: { isLoaded: false },
        installation: { inProgress: false },
        installedGameIds: [],
        recentlyViewedGames: [],
        isSearchFocused: false,
        isAboutOpen: false,
        isSettingsOpen: false
    }
};