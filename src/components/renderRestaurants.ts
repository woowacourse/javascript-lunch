import { Restaurant } from "../../types/global";
import getRestaurant from "./Restaurant/Restaurant.js";
import "./restaurantlist.css";

const renderRestaurants = (
  restaurants: Restaurant[],
  onRestaurantClick: any,
) => {
  const restaurantList = document.querySelector(".restaurant-list");
  restaurantList!.innerHTML = "";
  restaurants.forEach((data: Restaurant) => {
    const restaurantItem = document.createElement("li");
    restaurantItem.classList.add("restaurant");
    const restaurant = getRestaurant(data);
    restaurantItem.innerHTML = restaurant;
    restaurantItem.addEventListener("click", () => onRestaurantClick(data));
    restaurantList!.appendChild(restaurantItem);
  });
};

export default renderRestaurants;
