import "../css/style.css";
import "./assets/add-button.png";
import "./assets/category-asian.png";
import "./assets/category-chinese.png";
import "./assets/category-etc.png";
import "./assets/category-japanese.png";
import "./assets/category-korean.png";
import "./assets/category-western.png";
import "./assets/favorite-icon-filled.png";
import "./assets/favorite-icon-lined.png";

import { filterCategory } from "./domain/filter";
import RestaurantsController from "./domain/RestaurantsController";
import {
  handleModalCancelButtonClick,
  handleModalOpenButtonClick,
} from "./ui/modal";
import {
  executeChangeEventListener,
  executeClickEventListener,
  executeSubmitEventListener,
} from "./util/eventListener";

const App = {
  restaurantsController: RestaurantsController.getInstance(),

  init() {
    this.initEventListeners();
  },

  initEventListeners() {
    this.controlNewRestaurantModal();
    this.controlFilter();

    const selectedCategory = localStorage.getItem("category") as string | null;
    filterCategory(selectedCategory ?? "전체");
  },

  controlNewRestaurantModal() {
    executeClickEventListener(".gnb__button", () =>
      handleModalOpenButtonClick(".modal")
    );

    executeClickEventListener(".button--secondary", () =>
      handleModalCancelButtonClick(".modal")
    );

    executeClickEventListener(".modal-backdrop", () =>
      handleModalCancelButtonClick(".modal")
    );

    executeSubmitEventListener("#new-restaurant-form", (event: Event) => {
      this.restaurantsController.addNewRestaurant(event);
    });
  },

  controlFilter() {
    executeChangeEventListener("#sorting-filter", (selectedSort: string) => {
      this.restaurantsController.sortRestaurantList(selectedSort);
    });

    executeChangeEventListener(
      "#category-filter",
      (selectedCategory: string) => {
        filterCategory(selectedCategory);
      }
    );
  },
};

App.init();
