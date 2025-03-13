import { RestaurantData } from "../data/RestaurantMockData.ts";
import Restaurant from "./Restaurant/Restaurant.js";

const createList = () => {
  const restaurantItem = document.createElement("li");
  restaurantItem.classList.add("restaurant");
  document.querySelector(".restaurant-list").appendChild(restaurantItem);
  return restaurantItem;
};
export const createRestaurant = () => {
  RestaurantData.forEach((data) => {
    const restaurantItem = createList();
    new Restaurant(restaurantItem, data);
  });
};

export const updateRestaurant = (newData) => {
  const restaurantItem = createList();
  new Restaurant(restaurantItem, newData);
};
