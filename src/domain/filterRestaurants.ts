import { createRestaurant } from "../components/createRestaurant.js";
import {
  DEFAULT_CATEGORY,
  DEFAULT_SORT_TYPE,
  SORT_TYPE,
  STORAGE_KEY,
} from "../data/constants.ts";
import { getStoredRestaurantData } from "./storeRestaurantData.ts";

export const filterRestaurants = (category?: string, sort?: string) => {
  const savedCategory =
    localStorage.getItem(STORAGE_KEY.CATEGORY) || DEFAULT_CATEGORY;
  const savedSort =
    localStorage.getItem(STORAGE_KEY.SORT_TYPE) || DEFAULT_SORT_TYPE;

  const finalCategory = category || savedCategory;
  const finalSort = sort || savedSort;

  let filteredData = getStoredRestaurantData();

  if (finalCategory !== DEFAULT_CATEGORY) {
    filteredData = filteredData.filter(
      (restaurant) => restaurant.imgAlt === finalCategory,
    );
  }

  if (finalSort === SORT_TYPE.NAME) {
    filteredData.sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));
  } else {
    filteredData.sort((a, b) => a.distance - b.distance);
  }

  localStorage.setItem(STORAGE_KEY.CATEGORY, finalCategory);
  localStorage.setItem(STORAGE_KEY.SORT_TYPE, finalSort);

  createRestaurant(filteredData);
};
