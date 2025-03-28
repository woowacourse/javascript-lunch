import { RESTAURANT_MODAL_PROPERTY } from "../contants.js";
import EventHandler from "../controllers/EventHandler.js";
import ListController from "../controllers/ListController.js";
import ModalController from "../controllers/ModalController.js";
import RestaurantList from "../domain/RestaurantList.ts";
import { getRestaurantStorage } from "../utils/store.js";
import Form from "./Form/Form.js";
import ListItem from "./ListItem.js";

export function toggleFavorite(event, restaurantList, restaurantId) {
  restaurantList.updateFavorite(restaurantId);
  const favoriteIcon = event.target.closest("img.favorites-icon");
  const restaurantFavoriteIconElement = document.querySelector(
    `.restaurant-list-container [data-id="${restaurantId}"] img.favorites-icon`,
  );

  if (!favoriteIcon) return;

  if (favoriteIcon.src.includes("favorite-icon-lined.png")) {
    favoriteIcon.src = "https://aydenote.github.io/javascript-lunch/favorite-icon-filled.png";
    restaurantFavoriteIconElement.src = "https://aydenote.github.io/javascript-lunch/favorite-icon-filled.png";
  } else {
    favoriteIcon.src = "https://aydenote.github.io/javascript-lunch/favorite-icon-lined.png";
    restaurantFavoriteIconElement.src = "https://aydenote.github.io/javascript-lunch/favorite-icon-lined.png";
  }
}

function openModal(restaurantList, restaurantId) {
  const filteredRestaurant = restaurantList.getRestaurantInformation(restaurantId);
  const formItems = [
    ListItem(filteredRestaurant, {
      onClick: (event) => toggleFavorite(event, restaurantList, restaurantId),
      className: "information",
    }),
  ];
  const mainElement = app.querySelector("main");
  const formElement = Form({ formItems, buttons: RESTAURANT_MODAL_PROPERTY });

  const modalElement = document.querySelector(".modal");
  if (modalElement) modalElement.remove();
  ModalController({
    children: { formElement },
    submit: (event) => {
      const restaurantElement = document.querySelector(".restaurant");
      const storedRestaurants = getRestaurantStorage("restaurant");
      const restaurantList = new RestaurantList(storedRestaurants);
      restaurantList.deleteRestaurant(restaurantElement.dataset.id);
    },
    cancel: () => {
      EventHandler.modalToggle(mainElement, formElement);
    },
  });
  EventHandler.modalToggle(app);
}

export const restaurantItemClick = (event, restaurantList) => {
  const restaurantId = event.currentTarget.dataset.id;
  if (event.target.className === "favorites-icon") {
    toggleFavorite(event, restaurantList, restaurantId);
  } else {
    openModal(restaurantList, restaurantId);
  }
};

function List(listItems, restaurantList) {
  const listElement = document.createElement("ul");
  listElement.classList.add("restaurant-list");

  listItems.forEach((item) => {
    const listItemElement = ListItem(item.information, {
      onClick: (event) => restaurantItemClick(event, restaurantList),
    });
    listElement.appendChild(listItemElement);
  });

  return listElement;
}

export default List;
