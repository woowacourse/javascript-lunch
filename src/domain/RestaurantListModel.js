export default class RestaurantListModel {
  #restaurantList;

  constructor(restaurantList) {
    this.#restaurantList = restaurantList;
  }

  updateRestautantList(newRestaurantList) {
    this.#restaurantList = [...newRestaurantList];
  }

  getRestaurantList() {
    return this.#restaurantList;
  }
}
