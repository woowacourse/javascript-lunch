import { createRestaurant } from "../components/createRestaurant.js";
import { getStoredRestaurantData } from "./storeRestaurantData.ts";

export const filterRestaurants = (category: string, sort: string) => {
  let filteredData = getStoredRestaurantData();
  if (category !== "전체") {
    filteredData = filteredData.filter(
      (restaurant) => restaurant.imgAlt === category,
    );
  }
  if (sort === "name") {
    filteredData.sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));
  } else {
    filteredData.sort((a, b) => a.distance - b.distance);
  }
  localStorage.setItem("selectedCategory", category);
  localStorage.setItem("sortType", sort);
  createRestaurant(filteredData);
  return filteredData;
};
