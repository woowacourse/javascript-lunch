export default class RestaurantService {
  constructor(restaurantStore) {
    this.restaurantStore = restaurantStore;
  }

  addRestaurant(restaurantInfo) {
    this.restaurantStore.addRestaurant(restaurantInfo);
  }

  getRestaurants() {
    return this.restaurantStore.getRestaurants();
  }
}
