import { RestaurantDetail, RestaurantList } from "../components";
import getFilteredRestaurants from "../utils/getFilteredRestaurants";
import RestaurantStore from "./RestaurantStore";

function setupRestaurantListSubscription(
  store: RestaurantStore,
  restaurantList: RestaurantList | undefined
) {
  return store.subscribe("restaurantList", (state) => {
    if (restaurantList) {
      const filteredRestaurants = getFilteredRestaurants(
        state.restaurants,
        state.currentFilter
      );
      restaurantList.updateRestaurantList(filteredRestaurants);
    }
  });
}

function setupRestaurantDetailSubscription(
  store: RestaurantStore,
  restaurantDetail: RestaurantDetail | undefined
) {
  return store.subscribe("restaurantDetail", (state) => {
    if (restaurantDetail) {
      restaurantDetail.updateDetailContent(state.selectedRestaurant);
    }
  });
}

export function setupSubscriptions(
  store: RestaurantStore,
  components: {
    restaurantList: RestaurantList | undefined;
    restaurantDetail: RestaurantDetail | undefined;
  }
) {
  const unsubscribes: Array<() => void> = [];

  if (components.restaurantList) {
    unsubscribes.push(
      setupRestaurantListSubscription(store, components.restaurantList)
    );
  }

  if (components.restaurantDetail) {
    unsubscribes.push(
      setupRestaurantDetailSubscription(store, components.restaurantDetail)
    );
  }
}
