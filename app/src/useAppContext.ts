import { useContext } from "react";
import { AppContext } from "./AppContextProvider";

export const useAppContext = () => useContext(AppContext);