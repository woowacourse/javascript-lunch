import "../css/style.css";
import { handleModalCancelButtonClick } from "./ui/modal";
import { executeClickEventListener } from "./util/eventListener";

const App = {
  init() {
    this.controlNewRestaurantModal();
  },

  controlNewRestaurantModal: () => {
    executeClickEventListener(
      ".button--secondary",
      handleModalCancelButtonClick
    );
    executeClickEventListener(".modal-backdrop", handleModalCancelButtonClick);
  },
};

App.init();
