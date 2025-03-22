import { createRestaurant } from "../components/createRestaurant.js";
import { getStoredRestaurantData } from "./storeRestaurantData.ts";

export const filterRestaurants = (category?: string, sort?: string) => {
  const savedCategory = localStorage.getItem("selectedCategory") || "전체";
  const savedSort = localStorage.getItem("sortType") || "distance";

  const finalCategory = category || savedCategory;
  const finalSort = sort || savedSort;

  let filteredData = getStoredRestaurantData();

  if (finalCategory !== "전체") {
    filteredData = filteredData.filter(
      (restaurant) => restaurant.imgAlt === finalCategory,
    );
  }

  if (finalSort === "name") {
    filteredData.sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));
  } else {
    filteredData.sort((a, b) => a.distance - b.distance);
  }

  localStorage.setItem("selectedCategory", finalCategory);
  localStorage.setItem("sortType", finalSort);

  createRestaurant(filteredData);
};
