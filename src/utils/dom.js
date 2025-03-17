import { $ } from "./querySelectors.js";

export const DOM = {
  $body: $("body"),
  $main: $("main"),
  $filterContainer: $(".restaurant-filter-container"),
  $restaurantContainer: $(".restaurant-list-container"),
  $favoriteContainer: $(".favorite-list-container"),
};
