import { RestaurantDetail, RestaurantList } from "../components";
import RestaurantStore from "./RestaurantStore";

export function subscribeRestaurantStore(
  store: RestaurantStore,
  restaurantList: RestaurantList | undefined,
  restaurantDetail: RestaurantDetail | undefined
) {
  store.subscribe("restaurantList", (state) => {
    if (restaurantList) {
      restaurantList.updateRestaurantList(state.filteredRestaurants);
    }
  });

  store.subscribe("restaurantDetail", (state) => {
    if (restaurantDetail) {
      restaurantDetail.updateDetailContent(state.selectedRestaurant);
    }
  });
}
