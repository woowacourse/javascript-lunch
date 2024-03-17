import FILLED_ICON from "../view/components/FavoriteToggler/Icons/favorite-icon-filled.png";
import FavoriteToggler from "../view/components/FavoriteToggler/FavoriteToggler";
import ModalController from "./ModalController";
import RenderController from "./RenderController";
import RestaurantListController from "./RestaurantListController";
import StatusController from "./StatusController";
import TabBar from "../view/components/TabBar/TabBar";
import findAncestorHasClass from "../utils/findAncestorHasClass";

class MainController {
  static start() {
    document.getElementById("main")?.append(ModalController.modal.element);

    RestaurantListController.initEntireRestaurantList();

    RenderController.renderTabBar();
    RenderController.renderFilterContainer();
    RenderController.renderAllUl();
    this.#setAddButton();
    this.#setUlEvent();
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

  static #setUlEvent() {
    const restaurantListUl = document.getElementById("restaurant-list-ul");
    const favoriteRestaurantListUl = document.getElementById(
      "favorite-restaurant-list-ul"
    );
    restaurantListUl?.addEventListener("click", this.#UlClickEvent.bind(this));
    favoriteRestaurantListUl?.addEventListener(
      "click",
      this.#UlClickEvent.bind(this)
    );
  }

  static #UlClickEvent(event: Event) {
    const targetElement = event.target as HTMLElement;
    const restaurantPreview = findAncestorHasClass(targetElement, "restaurant");
    if (restaurantPreview) {
      const restaurant =
        StatusController.getRestaurantFromPreview(restaurantPreview);
      const originalToggler =
        StatusController.getTogglerInPreview(restaurantPreview);
      const connectedToggler = this.#getConnectedToggler(originalToggler);
      ModalController.changeIntoRestaurantDetail();
      ModalController.setRestaurantDetail(restaurant);
      ModalController.setRestaurantDetailToggler(connectedToggler.element);
      ModalController.openModal();
    }
  }

  static #getConnectedToggler(toggler: HTMLButtonElement) {
    const isOn = (toggler.children[0] as HTMLImageElement).src === FILLED_ICON;
    const connectedToggler = new FavoriteToggler({
      isOn,
      toggleAction: () => {
        toggler.click();
      },
    });
    return connectedToggler;
  }
}

export default MainController;
