export default class RestaurantService {
  constructor(restaurantStore) {
    this.restaurantStore = restaurantStore;
  }

  addRestaurant(restaurantInfo) {
    this.restaurantStore.addRestaurant(restaurantInfo);
  }

  getRestaurants(options = { filterType: "all" }) {
    return this.restaurantStore.getRestaurants(options);
  }

  toggleFavorite(restaurantName) {
    this.restaurantStore.toggleFavorite(restaurantName);
  }
}
