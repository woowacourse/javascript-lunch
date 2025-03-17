import { pipe } from "@zoeykr/function-al";
import { CategoryType, Restaurant, SortByType } from "../entities";
import type { AppState } from "./App";

const getFilteredRestaurants = (
  restaurants: Restaurant[],
  categoryFilter: string
) =>
  categoryFilter === "ALL"
    ? restaurants
    : restaurants.filter((r) => r.category === categoryFilter);

const getSortedRestaurants = (restaurants: Restaurant[], sortBy: string) => {
  return [...restaurants].sort((a, b) => {
    if (sortBy === "DISTANCE") return a.distance - b.distance;
    if (sortBy === "NAME") return a.name.localeCompare(b.name);
    return 0;
  });
};

const getAllRestaurants = (
  categoryFilter: CategoryType | "ALL",
  sortBy: SortByType
) =>
  pipe(
    (restaurants) =>
      getFilteredRestaurants(restaurants as Restaurant[], categoryFilter),
    (filteredData) => getSortedRestaurants(filteredData, sortBy)
  );

const getFavoriteRestaurants = (
  restaurants: Restaurant[],
  favoriteIds: Restaurant["id"][]
) => {
  return restaurants.filter((restaurant) =>
    favoriteIds.includes(restaurant.id)
  );
};

export const getRestaurantsByTab = (state: AppState) => {
  return state.currentTab === "ALL"
    ? getAllRestaurants(state.categoryFilter, state.sortBy)(state.restaurants)
    : getFavoriteRestaurants(state.restaurants, state.favoriteIds);
};
