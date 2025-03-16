import ModalEventHandler from "../event/modalEventHandler.js";
import EventHandler from "../utils/EventHandler.js";
import createModalView from "../view/createModalView.js";

export function ModalController({ updateCategorySortListView, restaurantList }) {
  const { modalElement, formElement } = createModalView();
  ModalEventHandler({ modalElement, formElement }, updateCategorySortListView, restaurantList);

  return modalElement;
}

export default ModalController;
