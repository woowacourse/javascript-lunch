import Header from "./Header.js";
import Restaurant from "./Restaurant.js";
import { RestaurantData } from "./RestaurantData.js";
import { categoryValue } from "./optionValue.js";

new Header(document.querySelector(".gnb"));

RestaurantData.forEach((data) => {
  const restaurantItem = document.createElement("li");
  restaurantItem.classList.add("restaurant");
  document.querySelector(".restaurant-list").appendChild(restaurantItem);

  new Restaurant(restaurantItem, data);
});
