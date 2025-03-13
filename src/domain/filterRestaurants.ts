import { createRestaurant } from "../components/createRestaurant";
import { getStoredRestaurantData } from "./storeRestaurantData";

export const filterRestaurants = (category: string) => {
  let filteredData = getStoredRestaurantData();
  if (category !== "전체") {
    filteredData = filteredData.filter(
      (restaurant) => restaurant.imgAlt === category,
    );
  }
  localStorage.setItem("selectedCategory", category);
  createRestaurant(filteredData);
  return filteredData;
};
