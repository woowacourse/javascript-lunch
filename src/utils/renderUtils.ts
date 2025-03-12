import $restaurantItem from "../components/restaurant/restaurant-item.js";
import { Restaurant } from "../data/restaurant.js";

export const renderRestaurants = (
  restaurantList: HTMLElement,
  restaurants: Restaurant[]
) => {
  restaurantList.innerHTML = "";
  restaurants.forEach((data) => {
    restaurantList.appendChild($restaurantItem(data));
  });
};
