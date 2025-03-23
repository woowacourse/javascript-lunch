import {
  ALL_OPTION,
  CATEGORY_VALUES,
  DISTANCE_VALUES,
  NAME_OR_DISTANCE,
  STORAGE_KEYS,
} from "./consts";

export interface RestaurantValue {
  category: Category;
  name: NameOrDistance;
  distance: Distance;
  description: string;
  link: string;
  isFavorite: boolean;
}

export type AllOption = typeof ALL_OPTION;

export type Category = (typeof CATEGORY_VALUES)[number];

export type CategoryFilter = Category | AllOption;

export type Distance = (typeof DISTANCE_VALUES)[number];

export type NameOrDistance = (typeof NAME_OR_DISTANCE)[number];

export type NameOrDistanceFilter = NameOrDistance | AllOption;

export type TabInfo = "all" | "favorite";

export type RestaurantAppStorage = {
  [STORAGE_KEYS.RESTAURANT_LIST]: RestaurantValue[];
  [STORAGE_KEYS.CATEGORY]: CategoryFilter;
  [STORAGE_KEYS.NAME_OR_DISTANCE]: NameOrDistanceFilter;
  [STORAGE_KEYS.TAB_INFO]: TabInfo;
};
