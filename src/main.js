import image from "../public/icons/favorite-icon-filled.png";
import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import { restaurants } from "./database/restaurants.js";
import AddRestaurantModal from "./components/AddRestaurantModal.js";
import Modal from "./components/Modal.js";

addEventListener("load", () => {
  const app = document.querySelector("#app");
  const main = document.querySelector("main");
  const $modal = Modal();

  const $header = Header();
  const $restaurantList = RestaurantList(restaurants);
  const $addRestaurantModal = AddRestaurantModal();

  app.insertAdjacentHTML("afterbegin", $header);
  main.insertAdjacentHTML("afterbegin", $restaurantList);

  app.insertAdjacentHTML("afterbegin", $modal);
  const modal = document.querySelector("#modal-container");
  modal.insertAdjacentHTML("afterbegin", $addRestaurantModal);
});
