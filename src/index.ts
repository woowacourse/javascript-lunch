import "../css/style.css";
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
      handleModalCancelButtonClick(".modal");
    });
  },

  controlFilter() {
    executeChangeEventListener("#sorting-filter", (value: string) => {
      this.restaurantsController.sortRestaurantList(value);
    });

    executeChangeEventListener("#category-filter", (value: string) => {
      this.restaurantsController.filterRestaurantList(value);
    });
  },
};

App.init();
