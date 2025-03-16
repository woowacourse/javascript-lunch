import { getStoredRestaurantData } from "../domain/storeRestaurantData.ts";
import Restaurant from "./Restaurant/Restaurant.js";

const createList = () => {
  const restaurantItem = document.createElement("li");
  restaurantItem.classList.add("restaurant");
  document.querySelector(".restaurant-list").appendChild(restaurantItem);
  return restaurantItem;
};
export const createRestaurant = (filteredData) => {
  const restaurants = filteredData || getStoredRestaurantData();

  document.querySelector(".restaurant-list").innerHTML = "";

  restaurants.forEach((restaurant) => {
    const restaurantItem = createList();
    new Restaurant(restaurantItem, restaurant);
  });
};

export const updateRestaurant = (newData) => {
  const restaurantItem = createList();
  new Restaurant(restaurantItem, newData);
};
