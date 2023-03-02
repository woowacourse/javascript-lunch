import "../css/style.css";
import RestaurantsController from "./domain/RestaurantsController";
import {
  handleModalCancelButtonClick,
  handleModalOpenButtonClick,
} from "./ui/modal";
import {
  executeClickEventListener,
  executeSubmitEventListener,
} from "./util/eventListener";

const App = {
  restaurantsController: RestaurantsController.getInstance(),

  initEventListeners() {
    this.controlNewRestaurantModal();
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
};

App.initEventListeners();
