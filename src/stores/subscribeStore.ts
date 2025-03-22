import { RestaurantDetail, RestaurantList } from "../components";
import getFilteredRestaurants from "../utils/getFilteredRestaurants";
import RestaurantStore from "./RestaurantStore";

export function subscribeRestaurantStore(
  store: RestaurantStore,
  restaurantList: RestaurantList | undefined,
  restaurantDetail: RestaurantDetail | undefined
) {
  store.subscribe("restaurantList", (state) => {
    if (restaurantList) {
      const filteredRestaurants = getFilteredRestaurants(
        state.restaurants,
        state.currentFilter
      );
      restaurantList.updateRestaurantList(filteredRestaurants);
    }
  });

  store.subscribe("restaurantDetail", (state) => {
    if (restaurantDetail) {
      restaurantDetail.updateDetailContent(state.selectedRestaurant);
    }
  });
}
