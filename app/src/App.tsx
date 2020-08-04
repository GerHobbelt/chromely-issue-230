import React from "react";
import { AppContextProvider } from "./AppContextProvider";
import { Layout } from "./components/Layout";
import { Router } from "./components/Router";

export const App = () =>
    <AppContextProvider>
        <Layout>
            {(containerRef) => <Router containerRef={containerRef} />}
        </Layout>
    </AppContextProvider>