import Modal from "./components/Modal.js";
import RestaurantList from "./RestaurantList.js";

import restaurantData from "./restaurantData.js";
import querySelector from "./utils/querySelector.js";
import { modalUtils, restaurantUtils } from "./utils/utilsUI.js";

addEventListener("load", () => {
  const restaurantList = new RestaurantList(restaurantData);
  restaurantList.list.forEach((restaurant) => {
    restaurantUtils.addRestaurant(restaurant);
  });
  const modal = Modal();
  querySelector("main").appendChild(modal);

  querySelector(".gnb__button").addEventListener("click", () => {
    querySelector(".modal").classList.add("modal--open");
    modalUtils.addForm();

    querySelector(".modal-form").addEventListener("submit", (e) =>
      restaurantUtils.updateRestaurant(restaurantList, e)
    );
  });

  querySelector(".modal-backdrop").addEventListener(
    "click",
    modalUtils.closeModal
  );
});
