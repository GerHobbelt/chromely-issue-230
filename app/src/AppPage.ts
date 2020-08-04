import { AppContextInitialState } from "./AppContext";

export type AppPageName = typeof AppContextInitialState.page.name;

export type AppPage =
    { name: "category", id: string };