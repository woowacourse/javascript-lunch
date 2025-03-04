import image from "../public/icons/favorite-icon-filled.png";
import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import { restaurants } from "./database/restaurants.js";

addEventListener("load", () => {
  const app = document.querySelector("#app");
  const $header = Header();
  const $restaurantList = RestaurantList(restaurants);

  app.insertAdjacentHTML("afterbegin", $header);
  app.insertAdjacentHTML("beforeend", $restaurantList);
});
