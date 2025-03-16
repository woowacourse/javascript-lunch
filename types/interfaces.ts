import {
  Category,
  Distance,
  UrlString,
  NavBarKey,
  LabelKey,
  Uuid,
} from "./types";

export interface Restaurant {
  id: Uuid;
  category: Exclude<Category, "전체">;
  name: string;
  distance: Distance;
  description: string;
  link: UrlString;
  isFavorite: boolean;
}

export interface FilterOptions {
  tabType: NavBarKey;
  filterType: {
    categoryFilterType: Category;
    sortFilterType: Extract<LabelKey, "name" | "distance">;
  };
}
