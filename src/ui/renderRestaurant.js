import RestaurantCard from "../components/RestaurantCard";
import { $ } from "../utils/dom";

const renderRestaurants = (restaurantList, ...list) => {
  const ulTag = $(".restaurant-list");
  ulTag.innerHTML = "";

  list.forEach((restaurant) => {
    ulTag.appendChild(RestaurantCard(restaurant, restaurantList));
  });
};

export default renderRestaurants;
