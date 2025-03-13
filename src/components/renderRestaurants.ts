import { Restaurant } from "../../types/global";
import getRestaurant from "./Restaurant/Restaurant.js";
import "./restaurantlist.css";

const renderRestaurants = (restaurants: Restaurant[]) => {
  const restaurantList = document.querySelector(".restaurant-list");
  restaurantList!.innerHTML = "";
  restaurants.forEach((data: Restaurant) => {
    const restaurantItem = document.createElement("li");
    restaurantItem.classList.add("restaurant");
    const restaurant = getRestaurant(data);
    restaurantItem.innerHTML = restaurant;
    restaurantList!.appendChild(restaurantItem);
  });
};

export default renderRestaurants;
