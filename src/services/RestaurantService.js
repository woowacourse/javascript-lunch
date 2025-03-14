import { NAV_BAR_KEYS } from "../constants/constants.js";

export default class RestaurantService {
  constructor(restaurantStore) {
    this.restaurantStore = restaurantStore;
  }

  addRestaurant(restaurantInfo) {
    this.restaurantStore.addRestaurant(restaurantInfo);
  }

  getRestaurants(options = { filterType: NAV_BAR_KEYS.all }) {
    return this.restaurantStore.getRestaurants(options);
  }

  toggleFavorite(restaurantName) {
    this.restaurantStore.toggleFavorite(restaurantName);
  }
}
