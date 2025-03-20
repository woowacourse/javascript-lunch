import {
  RestaurantInfoWithAdditionalInfo,
  Category,
} from "../lunchRestaurantsService.js";

export type CategoryFilterOptions = Category | "전체";

export type SortOptions = "name" | "distance";

type SortCallback = (
  array: RestaurantInfoWithAdditionalInfo[]
) => RestaurantInfoWithAdditionalInfo[];

export const filterByCategory = (
  restaurantList: RestaurantInfoWithAdditionalInfo[],
  category: CategoryFilterOptions
) => {
  if (category === "전체") {
    return restaurantList;
  }
  return restaurantList.filter(
    (restaurant) => restaurant.category === category
  );
};

export const sortByOptions: Record<SortOptions, SortCallback> = {
  name: (array) => [...array].sort((a, b) => a.name.localeCompare(b.name)),
  distance: (array) => [...array].sort((a, b) => a.distance - b.distance),
};

export const sorting = (
  restaurantList: RestaurantInfoWithAdditionalInfo[],
  sortCallback: SortCallback
) => {
  return sortCallback(restaurantList);
};

export const filterByFavorite = (
  restaurants: RestaurantInfoWithAdditionalInfo[],
  restaurantId: string
) => {
  return restaurants.map((restaurant) =>
    restaurant.id === restaurantId
      ? { ...restaurant, isFavorite: !restaurant.isFavorite }
      : restaurant
  );
};
