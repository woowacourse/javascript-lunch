import { Restaurant } from "../../types/global.js";
import { RestaurantData } from "../constants/RestaurantData.js";
import getRestaurant from "./Restaurant/Restaurant.js";
import "./restaurantList.css";
const createRestaurant = () => {
  const restaurantList = document.querySelector(".restaurant-list");
  if (restaurantList!.childElementCount === 0) {
    RestaurantData.forEach((data: Restaurant) => {
      const restaurantItem = document.createElement("li");
      restaurantItem.classList.add("restaurant");
      const restaurant = getRestaurant(data);
      restaurantItem.innerHTML = restaurant;
      restaurantList!.appendChild(restaurantItem);
    });
  }
};
export default createRestaurant;
