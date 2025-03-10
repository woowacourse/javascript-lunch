import Modal from "./components/Modal.js";
import RestaurantForm from "./components/restaurantForm.js";
import createHeader from "./components/Header.js";
import createRestaurantItem from "./components/RestaurantItem.js";
import { restaurantsData } from "./restaurantsData.js";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });
  body.prepend(header);

  const restaurantList = document.querySelector(".restaurant-list");
  const addRestaurantModalButton = header.querySelector(".gnb__button");
  const addNewRestaurantModal = document.getElementById(
    "add-restaurant-dialog"
  );
  const closeModalButton = document.getElementById("cancel-dialog-btn");
  const formElement = addNewRestaurantModal.querySelector("form");

  const modal = new Modal(
    addNewRestaurantModal,
    addRestaurantModalButton,
    closeModalButton
  );

  new RestaurantForm(formElement, restaurantList, modal);

  restaurantsData.forEach((restaurantData) => {
    const restaurantItem = createRestaurantItem(restaurantData);
    restaurantList.appendChild(restaurantItem);
  });

  closeModalButton.addEventListener("click", () => {
    formElement.reset();
    addNewRestaurantModal.close();
  });
});
