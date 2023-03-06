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
    });
  },

  controlFilter() {
    executeChangeEventListener("#sorting-filter", (selectedOption: string) => {
      this.restaurantsController.sortRestaurantList(selectedOption);
    });

    executeChangeEventListener(
      "#category-filter",
      (selectedCategory: string) => {
        this.restaurantsController.filterRestaurantList(selectedCategory);
      }
    );
  },
};

App.init();
