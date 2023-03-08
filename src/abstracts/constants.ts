import { MenuAction, ModalAction, RestaurantAction } from "./types";

export const RESTAURANT_ACTION: RestaurantAction = {
  ADD_RESTAURANT: "add_restaurant",
  HANDLE_FAVORITE: "handle_favorite",
  FILTER_BY_CATEGORY: "filter_by_category",
  SORT_RESTAURANTS: "sort_restaurants",
} as const;

export const MODAL_ACTION: ModalAction = {
  MODAL_ON: "modal_on",
  MODAL_OFF: "modal_off",
} as const;

export const MENU_ACTION: MenuAction = {
  MENU_ALL: "menu_all",
  MENU_FAVORITE: "menu_favorite",
};

export const CATEGORY_IMG = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  아시안: "./category-asian.png",
  양식: "./category-western.png",
  기타: "./category-etc.png",
} as const;

export const FAVORITE_IMG = {
  EMPTY: "./favorite-icon-lined.png",
  FILLED: "./favorite-icon-filled.png",
} as const;

export const RESTAURANTS_STORAGE = "restaurantList";

export const CATEGORY_DEFAULT = "전체";

export const SORT_METHOD = {
  NAME: "name",
  DISTANCE: "distance",
} as const;
