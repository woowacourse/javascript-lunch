import RestaurantList from "../domain/RestaurantList.ts";
import ModalEventHandler from "../event/modalEventHandler.ts";
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
