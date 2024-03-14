import ModalController from "./ModalController";
import RenderController from "./RenderController";
import RestaurantListController from "./RestaurantListController";

class MainController {
  static start() {
    RestaurantListController.initEntireRestaurantList();
    RenderController.renderFilterContainer();
    RenderController.renderRestaurantListUl();
    RenderController.renderInMain(ModalController.modal.element);
    this.#setAddButton();
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
}

export default MainController;
