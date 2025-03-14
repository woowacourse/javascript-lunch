import {
  CATEGORY,
  NAV_BAR_KEYS,
  SORT_OPTIONS,
} from "../constants/constants.js";

export default class RestaurantService {
  constructor(restaurantStore) {
    this.restaurantStore = restaurantStore;
  }

  addRestaurant(restaurantInfo) {
    this.restaurantStore.addRestaurant(restaurantInfo);
  }

  getRestaurants(
    options = {
      tabType: NAV_BAR_KEYS.all,
      filterType: {
        categoryFilterType: CATEGORY[0],
        sortFilterType: Object.keys(SORT_OPTIONS)[0],
      },
    }
  ) {
    return this.restaurantStore.getRestaurants(options);
  }

  toggleFavorite(restaurantName) {
    this.restaurantStore.toggleFavorite(restaurantName);
  }
}
