import Modal from "./components/Modal/Modal.js";
import RestaurantForm from "./Restaurant/RestaurantForm.js";
import createHeader from "./components/\bHeader/Header.js";
import renderRestaurantElement from "./Restaurant/RestaurantItem.js";
import { restaurantsData } from "./constants/restaurantsMockData.js";
import createCategoryFilter from "./components/Filter/CategoryFilter.js";
import createSortFilter from "./components/Filter/SortFilter.js";
import createRestaurantList from "./Restaurant/RestaurantList.js";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });
  body.prepend(header);

  createCategoryFilter();
  createSortFilter();
  createRestaurantList();

  const restaurantList = document.querySelector(".restaurant-list");
  const addRestaurantModalButton = header.querySelector(".gnb__button");
  const addNewRestaurantModal = document.getElementById(
    "add-restaurant-dialog"
  );

  const formElement = addNewRestaurantModal.querySelector("form");

  const modal = new Modal(addNewRestaurantModal, addRestaurantModalButton);

  new RestaurantForm(formElement, restaurantList, modal);

  restaurantsData.forEach((restaurantData) => {
    const restaurantItem = renderRestaurantElement(restaurantData);
    restaurantList.appendChild(restaurantItem);
  });
});
