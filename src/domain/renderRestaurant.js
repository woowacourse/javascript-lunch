import RestaurantCard from "../components/restaurantCard";
import { $ } from "../utils/dom";

const renderRestaurants = (...restaurantList) => {
  const ulTag = $(".restaurant-list");

  [...restaurantList].forEach((restaurant) => {
    ulTag.appendChild(RestaurantCard(restaurant));
  });
};

export default renderRestaurants;
