import RestaurantList from "../domain/RestaurantList.js";
import ModalEventHandler from "../event/modalEventHandler.js";
import createModalView from "../view/createModalView.js";

interface ModalControllerType {
  updateCategorySortListView: () => void;
  restaurantList: RestaurantList;
}

export function ModalController({ updateCategorySortListView, restaurantList }: ModalControllerType) {
  const { modalElement, formElement } = createModalView();
  ModalEventHandler({ modalElement, formElement, updateCategorySortListView, restaurantList });

  return modalElement;
}

export default ModalController;
