import DetailModalEventHandler from "../event/detailModalEventHandler.js";
import ModalEventHandler from "../event/modalEventHandler.js";
import EventHandler from "../utils/EventHandler.js";
import createDetailModalView from "../view/createDetailModalView.js";
import createModalView from "../view/createModalView.js";

export function DetailModalController({
  restaurantName,
  restaurantList,
  updateCategorySortListView,
  updateFavoriteListView,
}) {
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
