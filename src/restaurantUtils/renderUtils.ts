import $restaurantItem from "../components/restaurant/restaurant-item.ts";
import { Restaurant } from "../data/models/restaurant.ts";

export const renderRestaurants = (
  restaurantList: HTMLElement,
  restaurants: Restaurant[]
) => {
  restaurantList.innerHTML = "";
  restaurants.forEach((data) => {
    restaurantList.appendChild($restaurantItem(data));
  });
};
