import Modal from "../view/components/Modal/Modal";
import ModalController from "./ModalController";
import RenderController from "./RenderController";
import RestaurantListController from "./RestaurantListController";
import StatusController from "./StatusController";
import findAncestorHasClass from "../utils/findAncestorHasClass";

class MainController {
  static start() {
    RestaurantListController.initEntireRestaurantList();
    RenderController.renderFilterContainer();
    RenderController.renderRestaurantListUl();
    RenderController.renderInMain(ModalController.modal.element);
    this.#setAddButton();
    this.#setRestaurantListUlEvent();
  }

  static #setAddButton() {
    const addRestaurantButton = document.getElementById(
      "add-restaurant-button"
    );

    addRestaurantButton?.addEventListener("click", () => {
      ModalController.changeIntoAddRestaurantForm();
      ModalController.openModal();
    });
  }

  static #setRestaurantListUlEvent() {
    const restaurantListUl = document.getElementById("restaurant-list-ul");
    restaurantListUl?.addEventListener("click", (event) => {
      const targetElement = event.target as HTMLElement;
      const restaurantPreview = findAncestorHasClass(
        targetElement,
        "restaurant"
      );
      if (restaurantPreview) {
        const restaurant =
          StatusController.getRestaurantFromPreview(restaurantPreview);
        ModalController.changeIntoRestaurantDetail();
        ModalController.setRestaurantDetail(restaurant);
        ModalController.openModal();
      }
    });
  }
}

export default MainController;
