import { SELECTED_OPTION } from "../constant";
import { RestaurantType } from "../type";
import { renderRestaurantList } from "../ui/restaurantListRenderer";
import {
  getAllRestaurantsInLocalStorage,
  saveSelectedCategory,
} from "./localStorageController";
const { All_CATEGORIES } = SELECTED_OPTION;

export const sortByName = (allRestaurants: RestaurantType[]) => {
  return allRestaurants.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
};

export const sortByDistance = (allRestaurants: RestaurantType[]) => {
  return allRestaurants.sort((a, b) => Number(a.distance) - Number(b.distance));
};

export const filterCategory = (selectedCategory: string) => {
  saveSelectedCategory(selectedCategory);

  const restaurantList = getAllRestaurantsInLocalStorage();
  if (selectedCategory === All_CATEGORIES)
    return renderRestaurantList(restaurantList);

  const filteredRestaurantList = restaurantList.filter(
    (restaurant) => restaurant.category === selectedCategory
  );
  return renderRestaurantList(filteredRestaurantList);
};
