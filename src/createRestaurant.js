import { RestaurantData } from "./RestaurantData.js";
import Restaurant from "./Restaurant.js";
const createRestaurant = () => {
  RestaurantData.forEach((data) => {
    const restaurantItem = document.createElement("li");
    restaurantItem.classList.add("restaurant");
    document.querySelector(".restaurant-list").appendChild(restaurantItem);
    new Restaurant(restaurantItem, data);
  });
};
export default createRestaurant;
