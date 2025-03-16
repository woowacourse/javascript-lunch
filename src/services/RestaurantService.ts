import { FilterOptions, Restaurant } from "../../types/interfaces.js";
import { CATEGORY, NAV_BAR_KEYS } from "../constants/constants.js";
import RestaurantStore from "../stores/RestaurantStore.js";

export default class RestaurantService {
  private restaurantStore: RestaurantStore;

  constructor(restaurantStore: RestaurantStore) {
    this.restaurantStore = restaurantStore;
  }

  addRestaurant(restaurantInfo: Omit<Restaurant, "id" | "isFavorite">) {
    this.restaurantStore.addRestaurant(restaurantInfo);
  }

  deleteRestaurant(restaurantId: Restaurant["id"]) {
    this.restaurantStore.deleteRestaurant(restaurantId);
  }

  getRestaurants(
    options: FilterOptions = {
      tabType: NAV_BAR_KEYS.all,
      filterType: {
        categoryFilterType: CATEGORY[0],
        sortFilterType: "name",
      },
    }
  ): Restaurant[] {
    return this.restaurantStore.getRestaurants(options);
  }

  getRestaurantInfo(restaurantId: Restaurant["id"]): Restaurant | undefined {
    return this.restaurantStore.getRestaurantInfo(restaurantId);
  }

  toggleFavorite(restaurantId: Restaurant["id"]) {
    this.restaurantStore.toggleFavorite(restaurantId);
  }
}
