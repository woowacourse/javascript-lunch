import ModalEventHandler from "../event/modalEventHandler.js";
import EventHandler from "../utils/EventHandler.js";
import createModalView from "../view/createModalView.js";

export function ModalController(mainElement, { updateCategorySortListView, restaurantList }) {
  const { modalElement, formElement } = createModalView();
  ModalEventHandler({ modalElement, formElement }, updateCategorySortListView, restaurantList);

  mainElement.appendChild(modalElement);

  return modalElement;
}

export default ModalController;
