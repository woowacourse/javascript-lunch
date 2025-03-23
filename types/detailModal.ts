import RestaurantList from "../src/domain/RestaurantList";

export interface detailModalControllerType {
  restaurantName: string;
  restaurantList: RestaurantList;
  updateCategorySortListView: () => void;
  updateFavoriteListView: () => void;
}

export interface detailModalEventHandlerType extends detailModalControllerType {
  modalElement: HTMLElement;
}
