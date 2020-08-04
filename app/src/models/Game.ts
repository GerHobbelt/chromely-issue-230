import { Category } from "./Category";

export interface Game {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    rating: number;
    developer: string;
    version: string;
    updated: Date;
    installCount: number;
    categoryId: string;
    category: Category;
    icon: string;
    banner: string;
    thumbnail: string;
    screenshots: string[];
    videos: string[];
    isDisabled: boolean;
}