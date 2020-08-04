import React, { forwardRef, useCallback } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement>
    & { align?: "left" | "right" | "middle" | "top" | "bottom" };
export const Image = forwardRef((props: Props, ref: React.RefObject<HTMLImageElement>) => {
    const { src, onDragStart, ...restProps } = props;

    const dragStart = useCallback((e: React.DragEvent<HTMLImageElement>) => {
        e.preventDefault();
        onDragStart?.call(undefined, e);
    }, [onDragStart]);

    return <img ref={ref} onDragStart={dragStart} src={src} {...restProps} />
});