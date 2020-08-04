import React, { useCallback } from "react";
import { AppPage } from "../../AppPage";
import { useAppContext } from "../../useAppContext";
import { ButtonLink } from "./ButtonLink";

export const PageLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { page: AppPage }) => {
    const { page, onClick, ...restProps } = props;
    const [app, dispatch] = useAppContext();

    const onClickInner = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        dispatch({ kind: "navigate", page });
        onClick?.call(undefined, event);
    }, [onClick, page]);

    return <ButtonLink onClick={onClickInner} {...restProps} />
};