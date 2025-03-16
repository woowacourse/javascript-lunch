import { detailModalControllerType } from "../../types/detailModal.ts";
import DetailModalEventHandler from "../event/detailModalEventHandler.ts";
import createDetailModalView from "../view/createDetailModalView.js";

export function DetailModalController({
  restaurantName,
  restaurantList,
  updateCategorySortListView,
  updateFavoriteListView,
}: detailModalControllerType) {
  const restaurant = restaurantList.getRestaurantByName(restaurantName)?.restaurant;
  const modalElement = createDetailModalView(restaurant);
  DetailModalEventHandler({
    modalElement,
    restaurantList,
    restaurantName,
    updateCategorySortListView,
    updateFavoriteListView,
  });

  return modalElement;
}

export default DetailModalController;
