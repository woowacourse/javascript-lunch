import "../css/style.css";
import {
  handleModalCancelButtonClick,
  handleModalOpenButtonClick,
} from "./ui/modal";
import { executeClickEventListener } from "./util/eventListener";

const App = {
  init() {
    this.controlNewRestaurantModal();
    this.controlHeaderButton();
  },

  controlNewRestaurantModal: () => {
    executeClickEventListener(".button--secondary", () =>
      handleModalCancelButtonClick(".modal")
    );
    executeClickEventListener(".modal-backdrop", () =>
      handleModalCancelButtonClick(".modal")
    );
  },

  controlHeaderButton: () => {
    executeClickEventListener(".gnb__button", () =>
      handleModalOpenButtonClick(".modal")
    );
  },
};

App.init();
