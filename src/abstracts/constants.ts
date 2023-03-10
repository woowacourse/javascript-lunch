import { RestaurantAction } from "./types";

export const RESTAURANT_ACTION: RestaurantAction = {
  ADD_RESTAURANT: "add_restaurant",
  FILTER_BY_CATEGORY: "filter_by_category",
  SORT_RESTAURANTS: "sort_restaurants",
  UPDATE_FAVORITE: "updateFavorite",
  SHOW_DETAIL: "showDetail",
} as const;

export const CATEGORY_IMG = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  아시안: "./category-asian.png",
  양식: "./category-western.png",
  기타: "./category-etc.png",
} as const;

export const FAVORITE_IMG = {
  "0": "./favorite-icon-lined.png",
  "1": "./favorite-icon-filled.png",
};

export const RESTAURANTS_STORAGE = "restaurantList";

export const CATEGORY_DEFAULT = "전체";

export const SORT_METHOD = {
  NAME: "name",
  DISTANCE: "distance",
} as const;
