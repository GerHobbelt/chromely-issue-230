import React from "react";
import { useAppContext } from "../useAppContext";
import { CategoryPage } from "./Category";

interface Props {
    containerRef: React.RefObject<HTMLDivElement>;
}

export const Router = (props: Props) => {
    const [app] = useAppContext();

    return (
        <React.Fragment>
            {app.page.name === "category" && <CategoryPage id={app.page.id} containerRef={props.containerRef} />}
        </React.Fragment>
    );
}