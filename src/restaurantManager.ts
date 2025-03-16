import { restaurantsData } from "./restaurantsData.ts";
import { localStorageUtils } from "./utils/localStorageUtils.ts";
import { Category, Restaurant, SortType } from "./types/restaurant.ts";

const getUniqueRestaurantId = () => {
  const randomId = Math.floor(Math.random() * 1000000);
  return `restaurant-${randomId}`;
};

const getInitialLoadRestaurantData = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const localStorageRestaurantData = localStorageUtils.get("restaurants") || [];

  if (localStorageRestaurantData.length === 0) {
    const initialRestaurantsData = restaurantsData.map((restaurant) => {
      const id = getUniqueRestaurantId();
      return {
        ...restaurant,
        id,
        isFavorite: false,
      };
    });
    localStorageUtils.set("restaurants", initialRestaurantsData);
  }

  return localStorageRestaurantData;
};

const getFavoriteRestaurants = (restaurants: Restaurant[]) => {
  return restaurants.filter((restaurant: Restaurant) => restaurant.isFavorite);
};

const getFilterAndSortRestaurants = (
  restaurants: Restaurant[],
  category: Category,
  sortType: SortType
) => {
  return restaurants
    .filter((restaurant: Restaurant) => {
      if (category === "전체") {
        return true;
      }
      return category === restaurant.category;
    })
    .sort((a, b) => {
      if (sortType === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.distance - b.distance;
    });
};

const addRestaurant = (restaurant: Restaurant) => {
  const localStorageRestaurantData = localStorageUtils.get("restaurants") || [];

  localStorageRestaurantData.push(restaurant);

  localStorageUtils.set("restaurants", localStorageRestaurantData);
};

const deleteRestaurant = (id: string) => {
  const localStorageRestaurantData = localStorageUtils.get("restaurants") || [];

  const filteredRestaurantData = localStorageRestaurantData.filter(
    (restaurant: Restaurant) => restaurant.id !== id
  );

  localStorageUtils.set("restaurants", filteredRestaurantData);
};

const toggleFavoriteRestaurant = (id?: string) => {
  if (!id) {
    return;
  }

  const localStorageRestaurantData = localStorageUtils.get("restaurants") || [];

  const toggledRestaurantData = localStorageRestaurantData.map(
    (restaurant: Restaurant) => {
      if (restaurant.id === id) {
        return {
          ...restaurant,
          isFavorite: !restaurant.isFavorite,
        };
      }
      return restaurant;
    }
  );

  localStorageUtils.set("restaurants", toggledRestaurantData);
};

export const restaurantManager = {
  getUniqueId: getUniqueRestaurantId,
  getInitialData: getInitialLoadRestaurantData,
  getFavoriteList: getFavoriteRestaurants,
  getFilterAndSortList: getFilterAndSortRestaurants,
  add: addRestaurant,
  delete: deleteRestaurant,
  toggleFavorite: toggleFavoriteRestaurant,
};
