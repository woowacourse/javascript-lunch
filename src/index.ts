import "../css/style.css";
import { handleModalCancelButtonClick } from "./ui/modal";
import { executeClickEventListener } from "./util/eventListener";

const App = {
  init() {
    this.controlNewRestaurantModal();
  },

  controlNewRestaurantModal: () => {
    executeClickEventListener(".button--secondary", () =>
      handleModalCancelButtonClick(".modal")
    );
    executeClickEventListener(".modal-backdrop", () =>
      handleModalCancelButtonClick(".modal")
    );
  },
};

App.init();
