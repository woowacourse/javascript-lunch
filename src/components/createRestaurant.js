import { RestaurantData } from "../constants/RestaurantData.js";
import Restaurant from "./Restaurant/Restaurant.js";
import "./restaurantList.css";
const createRestaurant = () => {
  RestaurantData.forEach((data) => {
    const restaurantItem = document.createElement("li");
    restaurantItem.classList.add("restaurant");
    document.querySelector(".restaurant-list").appendChild(restaurantItem);
    new Restaurant(restaurantItem, data);
  });
};
export default createRestaurant;
