import React, { useCallback, useEffect, useState } from "react";
import { Observable } from "rxjs";
import { ButtonLink, GameButton, Image, LoadFailed, PageLink } from ".";
import { numberAsAbbreviation, useSubscription } from "../../helpers";
import { Game } from "../../models";
import { useAppContext } from "../../useAppContext";

const GameBlock = (game: Game) => {
    const [app, dispatch] = useAppContext();
    const openGame = useCallback(
        () => dispatch({ kind: "navigate", page: { name: "game", id: game.id } }),
        [game.id]);

    return (
        <div className="row align-items-center content_box_table_row games-infinite-list-game-row" onClick={openGame}>
            <div className="col-auto col-md-1 game_icon">
                <PageLink page={{ name: "game", id: game.id }}>
                    <Image src={game.icon} alt="Game Icon" />
                </PageLink>
            </div>
            <div className="col-auto col-md game_title">
                <PageLink page={{ name: "game", id: game.id }} title={game.title}>
                    {game.title}
                </PageLink>
            </div>
            <div className="col-2 d-none d-md-block game_downloads">
                {numberAsAbbreviation(game.installCount)}
            </div>
            <div className="col-md-3 col-lg-2 d-none d-md-block game_dev">
                {game.developer}
            </div>
            <div className="col col-md-3 col-lg-2 text-right">
                <GameButton gameId={game.id} />
            </div>
        </div>
    )
}

interface Props {
    load: (offset: number, limit: number) => Observable<Game[]>;
    containerRef: React.RefObject<HTMLDivElement>;
}

const pageSize = 15;
const loadMoreThreshold = 200;
export const GamesInfiniteList = ({ load, containerRef }: Props) => {
    const [games, setGames] = useState<Game[] | "failed-to-load">([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [endReached, setEndReached] = useState(false);
    const [loadMore, setLoadMore] = useState(true);

    useEffect(() => {
        setGames([]);
        setOffset(0);
        setEndReached(false);
        setLoadMore(true);
    }, [load])

    useEffect(() => {
        if (containerRef.current === null) {
            return;
        }

        const updateLoadMore = () => {
            const scrollBottom = container.scrollTop + container.clientHeight;
            const scrollThreshold = container.scrollHeight - loadMoreThreshold;
            const isNearEnd = scrollBottom >= scrollThreshold;
            setLoadMore(isNearEnd);
        }

        const container = containerRef.current;
        const oldOnScroll = container.onscroll;
        function onScroll(this: GlobalEventHandlers, event: Event) {
            updateLoadMore();
            oldOnScroll?.call(this, event);
        }

        container.onscroll = onScroll;
        return () => { container.onscroll = oldOnScroll; }
    }, [containerRef.current]);

    const doLoadMore = useSubscription(() => {
        setIsLoading(true);
        return load(offset, pageSize)
            .subscribe({
                next: gamesPage => {
                    if (gamesPage.length > 0) {
                        setGames(current => (current !== "failed-to-load" ? current : []).concat(gamesPage));
                        setOffset(current => current + gamesPage.length);
                    }

                    if (gamesPage.length < pageSize) {
                        setEndReached(true);
                    }

                    setIsLoading(false);
                },
                error: () => {
                    setGames("failed-to-load");
                    setEndReached(true);
                    setIsLoading(false);
                }
            });
    }, [load, offset]);

    const retryLoadMore = useCallback(() => {
        setGames([]);
        setOffset(0);
        setEndReached(false);
        doLoadMore();
    }, []);

    useEffect(() => {
        const hasLoadedInitialGames = games.length > 0 || endReached;
        if (loadMore === false && hasLoadedInitialGames) {
            return;
        }

        doLoadMore();
    }, [load, loadMore]);

    const onLoadMoreClicked = useCallback(() => doLoadMore(), [doLoadMore]);

    return (
        <React.Fragment>
            {games !== "failed-to-load" && (
                <React.Fragment>
                    <div className="content_box_table_heading d-none d-md-block">
                        <div className="row align-items-center">
                            <div className="col-1 game_icon">
                                &nbsp; {/* Icon */}
                            </div>
                            <div className="col col-md game_title">
                                Name
                            </div>
                            <div className="col-2 text-center">
                                Downloads
                            </div>
                            <div className="col-md-3 col-lg-2 text-center">
                                Game Developer
                            </div>
                            <div className="col col-md-3 col-lg-2">
                                &nbsp; {/* Install Button */}
                            </div>
                        </div>
                    </div>
                    {games.map(game => <GameBlock key={game.id} {...game} />)}
                </React.Fragment>
            )}
            {games === "failed-to-load" && (
                <div className="games-infinite-list-failed-to-load">
                    <LoadFailed headingText="Failed to load category games." tryAgain={retryLoadMore} />
                </div>
            )}
            {isLoading && (
                <div className="games-infinite-list-loading-indicator">
                    Loading...
                </div>
            )}
            {!isLoading && !endReached &&
                <div className="games-infinite-list-load-more-container">
                    <ButtonLink className="btn-load-more" onClick={onLoadMoreClicked}>
                        Load More
                    </ButtonLink>
                </div>}
        </React.Fragment>
    )
}