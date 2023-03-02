import "../css/style.css";
import {
  handleModalCancelButtonClick,
  handleModalOpenButtonClick,
} from "./ui/modal";
import {
  executeClickEventListener,
  executeSubmitEventListener,
} from "./util/eventListener";

const App = {
  initEventListeners() {
    this.controlNewRestaurantModal();
  },

  controlNewRestaurantModal: () => {
    executeClickEventListener(".gnb__button", () =>
      handleModalOpenButtonClick(".modal")
    );

    executeClickEventListener(".button--secondary", () =>
      handleModalCancelButtonClick(".modal")
    );

    executeClickEventListener(".modal-backdrop", () =>
      handleModalCancelButtonClick(".modal")
    );

    executeSubmitEventListener("#new-restaurant-form");
  },
};

App.initEventListeners();
