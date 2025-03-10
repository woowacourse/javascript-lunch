import RestaurantCard from "../restaurantCard";
import { $ } from "../../utils/dom";

const Restaurants = (...restaurantList) => {
  const ulTag = $(".restaurant-list");

  [...restaurantList].forEach((restaurant) => {
    ulTag.appendChild(RestaurantCard(restaurant));
  });
};

export default Restaurants;
