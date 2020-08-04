import React, { createRef, useEffect } from "react";
import { useAppContext } from "../useAppContext";
import { InstallGamePopup } from "./InstallGamePopup";

interface Props {
    children: (containerRef: React.RefObject<HTMLDivElement>) => React.ReactNode;
}

export const Content = (props: Props) => {
    const [app] = useAppContext();
    const ref = createRef<HTMLDivElement>();
    useEffect(() => {
        if (ref.current !== null) {
            ref.current.scrollTop = 0;
        }
    }, [app.page]);

    return (
        <div ref={ref} className="scrollable-content">
            {props.children(ref)}
        </div>
    )
}

export const Layout = (props: Props) => {
    return (
        <div id="layout">
            <div className="heading" />
            <Content>
                {props.children}
            </Content>
            <InstallGamePopup />
        </div>
    )
}