import Modal from "./components/Modal/Modal.js";
import RestaurantForm from "./components/RestaurantForm/RestaurantForm.js";
import createHeader from "./components/\bHeader/Header.js";
import renderRestaurantElement from "./components/RestaurantItem/RestaurantItem.js";
import { restaurantsData } from "./restaurantsMockData.js";

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
    const restaurantItem = renderRestaurantElement(restaurantData);
    restaurantList.appendChild(restaurantItem);
  });

  closeModalButton.addEventListener("click", () => {
    formElement.reset();
    addNewRestaurantModal.close();
  });
});
