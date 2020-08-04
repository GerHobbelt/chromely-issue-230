import React, { forwardRef, useCallback, useMemo } from "react";

export const ButtonLink = forwardRef((props: React.AnchorHTMLAttributes<HTMLAnchorElement>, ref: React.RefObject<HTMLAnchorElement>) => {
    const { onClick, onDragStart, href: hrefProp, ...restProps } = props;
    const href = useMemo(() => hrefProp ?? "#", [hrefProp]);

    const click = useCallback((event: React.SyntheticEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onClick?.call(undefined, event);
    }, [onClick]);

    const dragStart = useCallback((event: React.DragEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        onDragStart?.call(undefined, event);
    }, [onDragStart]);

    return <a ref={ref} onClick={click} onDragStart={dragStart} href={href} {...restProps} />
});