import RestaurantList from "../domain/RestaurantList.js";
import DetailModalEventHandler from "../event/detailModalEventHandler.js";
import createDetailModalView from "../view/createDetailModalView.js";

interface detailModalControllerType {
  restaurantName: string;
  restaurantList: RestaurantList;
  updateCategorySortListView: () => void;
  updateFavoriteListView: () => void;
}

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
