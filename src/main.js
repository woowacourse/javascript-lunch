import Modal from "./components/Modal.js";
import RestaurantList from "./stores/RestaurantList.js";

import restaurantData from "./restaurantData.js";
import querySelector from "./utils/querySelector.js";
import { modalHandler } from "./handlers/modalHandler.js";
import { restaurantHandler } from "./handlers/restaurantHandler.js";

addEventListener("load", () => {
  const restaurantList = new RestaurantList(restaurantData);
  restaurantList.list.forEach((restaurant) => {
    restaurantHandler.addRestaurantItem(restaurant);
  });
  const modal = Modal();
  querySelector("main").appendChild(modal);

  querySelector(".gnb__button").addEventListener("click", () => {
    querySelector(".modal").classList.add("modal--open");
    modalHandler.addForm();

    querySelector(".modal-form").addEventListener("submit", (e) =>
      restaurantHandler.uploadRestaurant(restaurantList, e)
    );
  });

  querySelector(".modal-backdrop").addEventListener(
    "click",
    modalHandler.closeModal
  );
});
