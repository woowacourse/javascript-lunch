import image from "../public/icons/favorite-icon-filled.png";
import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import { restaurants } from "./database/restaurants.js";

addEventListener("load", () => {
  const app = document.querySelector("#app");
  const main = document.querySelector("main");

  const $header = Header();
  const $restaurantList = RestaurantList(restaurants);

  app.insertAdjacentHTML("afterbegin", $header);
  main.insertAdjacentHTML("afterbegin", $restaurantList);
});
