import { RestaurantAction } from "./types";

export const RESTAURANT_ACTION: RestaurantAction = {
  ADD_RESTAURANT: "add_restaurant",
  FILTER_BY_CATEGORY: "filter_by_category",
  SORT_RESTAURANTS: "sort_restaurants",
} as const;

export const CATEGORY_IMG = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  아시안: "./category-asian.png",
  양식: "./category-western.png",
  기타: "./category-etc.png",
};
