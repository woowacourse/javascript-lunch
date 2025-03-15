import DetailItem from "../components/DetailItem.js";
import Modal from "../components/Modal.js";
import EventHandler from "../utils/EventHandler.js";
import CategoryFilterController from "./CategoryFilterController.js";
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

  const { listElement, restaurantList, updateList } = ListController(allListContainerElement);
  const { favoriteListElement, updateFavoriteList } = FavoriteListController(
    favoriteListContainerElement,
    restaurantList,
  );

  const { categoryFilterElement, sortingFilterElement } = CategoryFilterController(allListContainerElement, updateList);
  const modalElement = ModalController(mainElement, {
    updateList: () => updateList(categoryFilterElement.value, sortingFilterElement.value),
    restaurantList,
  });
  TabController(
    mainElement,
    { allListContainerElement, favoriteListContainerElement },
    { updateList: () => updateList(categoryFilterElement.value, sortingFilterElement.value), updateFavoriteList },
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

      favoriteListElement.querySelectorAll("li").forEach((favoriteListElement) => {
        if (favoriteListElement.dataset.name === restaurantName) {
          favoriteListElement.remove();
        }
      });
    }
  });

  mainElement.addEventListener("click", (event) => {
    if (event.target.closest(".favorite-star")) return;
    const restaurantElement = event.target.closest("li.restaurant");
    if (!restaurantElement) return;
    const restaurantName = restaurantElement.dataset.name;
    const restaurant = restaurantList.getRestaurantByName(restaurantName);
    const dummy = document.createElement("div");
    const detailItemElement = DetailItem(restaurant.information);

    const modalElement = Modal([detailItemElement]);
    mainElement.appendChild(modalElement);

    const modalBackdropElement = modalElement.querySelector(".modal-backdrop");
    modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(modalElement));
    EventHandler.modalToggle(modalElement);
  });
}

export default MainController;
