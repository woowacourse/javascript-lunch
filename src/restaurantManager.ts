import { localStorageUtils } from "./utils/localStorageUtils.ts";
import { Restaurant } from "./types/restaurant.ts";
import { restaurantsData } from "./restaurantsData.ts";

const getInitialLoadRestaurantData = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const localStorageRestaurantData = localStorageUtils.get("restaurants") || [];

  if (localStorageRestaurantData.length === 0) {
    const initialRestaurantsData = restaurantsData.map((restaurant, index) => ({
      ...restaurant,
      id: `restaurant-${index}`,
    }));
    localStorageUtils.set("restaurants", initialRestaurantsData);
  }

  return localStorageRestaurantData;
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

export const restaurantManager = {
  getInitialData: getInitialLoadRestaurantData,
  add: addRestaurant,
  delete: deleteRestaurant,
};
