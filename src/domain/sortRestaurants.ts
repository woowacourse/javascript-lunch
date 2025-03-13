import { createRestaurant } from "../components/createRestaurant";
import { filterRestaurants } from "./filterRestaurants";

export const sortRestaurants = (sort: string) => {
  const currentCategory = localStorage.getItem("selectedCategory") || "전체";
  const currentRestaurants = filterRestaurants(currentCategory);
  if (sort === "name") {
    currentRestaurants.sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));
  } else {
    currentRestaurants.sort((a, b) => a.distance - b.distance);
  }
  localStorage.setItem("sortType", sort);
  createRestaurant(currentRestaurants);
  return currentRestaurants;
};
