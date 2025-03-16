import Button from "../components/Button.js";
import DetailItem from "../components/DetailItem.js";
import ButtonsForm from "../components/Form/ButtonsForm.js";
import Modal from "../components/Modal.js";
import { LIST_ITEM_CONTENTS } from "../constants/listData.js";
import RestaurantList from "../domain/RestaurantList.js";
import EventHandler from "../utils/EventHandler.js";
import CategorySortFilterController from "./CategorySortFilterController.js";
import FavoriteListController from "./FavoriteListController.js";
import HeaderController from "./HeaderController.js";
import ListController from "./ListController.js";
import ModalController from "./ModalController.js";
import TabController from "./TabController.js";

function MainController() {
  const app = document.getElementById("app");
  const mainElement = app.querySelector("main");
  const allListContainerElement = mainElement.querySelector(".all-restaurant-list-container");
  const favoriteListContainerElement = mainElement.querySelector(".favorite-restaurant-list-container");

  const restaurantList = new RestaurantList(LIST_ITEM_CONTENTS); // 도메인

  const updateListView = ListController(allListContainerElement, restaurantList);
  const updateFavoriteListView = FavoriteListController(favoriteListContainerElement, restaurantList);
  const updateCategorySortListView = CategorySortFilterController(allListContainerElement, updateListView);

  const modalElement = ModalController(mainElement, {
    updateCategorySortListView,
    restaurantList,
  });

  TabController(
    mainElement,
    { allListContainerElement, favoriteListContainerElement },
    {
      updateListView: updateCategorySortListView,
      updateFavoriteListView,
    },
  );

  HeaderController(app, modalElement);

  mainElement.addEventListener("click", (event) => {
    const starElement = event.target.closest(".favorite-star");
    if (!starElement) return;
    starElement.classList.toggle("active");
    const restaurantName = starElement.dataset.name;
    const restaurant = restaurantList.getRestaurantByName(restaurantName);

    if (restaurant) {
      restaurant.toggleFavorite();
      restaurantList.updateLocalStorage();

      // favoriteListElement.querySelectorAll("li").forEach((favoriteListElement) => {
      //   if (favoriteListElement.dataset.name === restaurantName) {
      //     favoriteListElement.remove();
      //   }
      // });
    }
  });

  const buttons = [
    { type: "submit", stylingBased: "secondary", text: "삭제하기" },
    { type: "button", stylingBased: "primary", text: "닫기" },
  ];

  mainElement.addEventListener("click", (event) => {
    if (event.target.closest(".favorite-star")) return;
    const restaurantElement = event.target.closest("li.restaurant");
    if (!restaurantElement) return;
    const restaurantName = restaurantElement.dataset.name;
    const restaurant = restaurantList.getRestaurantByName(restaurantName);
    const detailItemElement = DetailItem(restaurant.information);

    const formButtons = buttons.map((buttonData) => Button(buttonData));
    const buttonsFormElement = ButtonsForm(formButtons);
    const modalElement = Modal([detailItemElement, buttonsFormElement]);
    mainElement.appendChild(modalElement);

    const modalBackdropElement = modalElement.querySelector(".modal-backdrop");
    modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(modalElement));
    buttonsFormElement
      .querySelector("button[type='button']")
      .addEventListener("click", () => EventHandler.modalToggle(modalElement));
    buttonsFormElement.querySelector("button[type='submit']").addEventListener("click", () => {
      restaurantList.removeRestaurant(restaurantName);
      updateListView(categoryFilterElement.value, sortingFilterElement.value);
      updateFavoriteListView();
      EventHandler.modalToggle(modalElement);
    });
    EventHandler.modalToggle(modalElement);
  });
}

export default MainController;
