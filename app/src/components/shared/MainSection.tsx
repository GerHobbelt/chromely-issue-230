import React from "react";

export const MainSection = (props: React.HTMLAttributes<HTMLElement>) => {
    const { id, ...restProps } = props;

    return (
        <section id={id ?? "main"} {...restProps}>
            {props.children}
        </section>
    )
}