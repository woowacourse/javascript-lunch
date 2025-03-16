import { detailModalControllerType } from "../../types/detailModal.js";
import DetailModalEventHandler from "../event/detailModalEventHandler.js";
import createDetailModalView from "../view/createDetailModalView.js";

export function DetailModalController({
  restaurantName,
  restaurantList,
  updateCategorySortListView,
  updateFavoriteListView,
}: detailModalControllerType) {
  const restaurant = restaurantList.getRestaurantByName(restaurantName);
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
