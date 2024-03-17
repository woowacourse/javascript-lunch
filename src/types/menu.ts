import { MENU_APP_EVENTS } from "../constants/event";
import { CATEGORIES, RESTAURANT_TABS, SORT_TYPE } from "../constants/menu";

export type Distance = 5 | 10 | 15 | 20 | 30;

export type Category = keyof typeof CATEGORIES;
export type CategoryString = (typeof CATEGORIES)[Category];
export type CategoryStringWithoutAll = (typeof CATEGORIES)[Exclude<Category, "all">];

export type SortOption = keyof typeof SORT_TYPE;
export type SortOptionString = (typeof SORT_TYPE)[SortOption];

export interface RestaurantItem {
  name: string;
  category: CategoryStringWithoutAll;
  distance: Distance;
  isFavorite: boolean;
  description?: string;
  link?: string;
}

export type RestaurantAddItem = Omit<RestaurantItem, "isFavorite">;

export type RestaurantTab = keyof typeof RESTAURANT_TABS | undefined;
