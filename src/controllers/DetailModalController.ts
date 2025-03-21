import { detailModalControllerType } from "../../types/detailModal.ts";
import DetailModalEventHandler from "../event/detailModalEventHandler.ts";
import createDetailModalView from "../view/createDetailModalView.js";

class DetailModalController {
  modalElement: HTMLElement;

  constructor({
    restaurantName,
    restaurantList,
    updateCategorySortListView,
    updateFavoriteListView,
  }: detailModalControllerType) {
    const restaurant = restaurantList.getRestaurantByName(restaurantName)?.restaurant;
    this.modalElement = createDetailModalView(restaurant);

    DetailModalEventHandler({
      modalElement: this.modalElement,
      restaurantList,
      restaurantName,
      updateCategorySortListView,
      updateFavoriteListView,
    });
  }

  getElement() {
    return this.modalElement;
  }
}

export default DetailModalController;
