import Restaurant from "./model/Restaurant";
import { $ } from "./utils/dom";
import { getInfo } from "./view/input";
import { FOOD_CATEGORY } from "./constants/foodCategory";
import { WALK_TIME_MINUTES } from "./constants/walkTimeMinutes";
import header from "./components/header";
import restaurantCard from "./components/restaurantCard";
import { mockRestaurants } from "./mockRestaurant";

const restaurantList = [...mockRestaurants];

$("#register-button").addEventListener("click", (e) => {
  e.preventDefault();
  const restaurant = new Restaurant(getInfo());
  restaurantList.push(restaurant);

  $(".modal").classList.remove("modal--open");
  renderRestaurants(restaurantList);
});

const renderRestaurants = (restaurantList) => {
  const ulTag = $(".restaurant-list");
  restaurantList.forEach((restaurant) => {
    ulTag.appendChild(restaurantCard(restaurant));
  });
};

addEventListener("load", () => {
  $("#app").prepend(header());
  renderRestaurants(restaurantList);
});
