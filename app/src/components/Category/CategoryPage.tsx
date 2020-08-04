import React, { useCallback, useState } from "react";
import { of } from "rxjs";
import { Category, Game } from "../../models";
import { GamesInfiniteList, Image, MainSection } from "../shared";

import icon from "../../images/icon.png";
import wallpaper from "../../images/wallpaper.jpg";

interface Props {
    id: string;
    containerRef: React.RefObject<HTMLDivElement>;
}

export const CategoryPage = (props: Props) => {
    const [category] = useState<Category>({
        id: "id",
        banner: wallpaper,
        name: "Title",
        description: "Description",
        parentId: ""
    });
    const loadGames = useCallback(
        (offset: number, pageSize: number) => {
            const games: Game[] = new Array(pageSize).fill(0).map(_ => ({
                id: "id",
                icon,
                title: "Name",
                description: "Description",
                installCount: 10000000,
                developer: "Dev"
            } as Game));

            return of(games);
        },
        [props.id])

    return (
        <MainSection className="category-page">
            <div id="category_background">
                <Image src={category.banner} alt="Wallpaper" />
            </div>
            <div id="category_content">
                <div className="container content_box">
                    <div className="row content_box_heading">
                        <div className="col text-center">
                            <h1>
                                {category.name}
                            </h1>
                            <h2 className="subheading">
                                {category.description}
                            </h2>
                        </div>
                    </div>
                    <GamesInfiniteList load={loadGames} containerRef={props.containerRef} />
                </div>
            </div>
        </MainSection>
    )
}