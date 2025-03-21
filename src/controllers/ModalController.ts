import RestaurantList from "../domain/RestaurantList.ts";
import ModalEventHandler from "../event/modalEventHandler.ts";
import createModalView from "../view/createModalView.js";

interface ModalControllerType {
  updateCategorySortListView: () => void;
  restaurantList: RestaurantList;
}

class ModalController {
  modalElement;
  formElement;
  constructor({ updateCategorySortListView, restaurantList }: ModalControllerType) {
    const { modalElement, formElement } = createModalView();
    this.modalElement = modalElement;
    this.formElement = formElement;

    ModalEventHandler({
      modalElement: this.modalElement,
      formElement: this.formElement,
      updateCategorySortListView,
      restaurantList,
    });
  }

  getModalElement() {
    return this.modalElement;
  }

  render(container: HTMLElement) {
    return container.appendChild(this.modalElement);
  }
}

export default ModalController;
