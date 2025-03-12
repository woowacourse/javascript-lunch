export default class RestaurantListModel {
  #restaurantList;

  constructor() {
    this.#restaurantList = [];
  }

  updateRestautantList(newRestaurantList) {
    this.#restaurantList = [...newRestaurantList];
  }

  getRestaurantList() {
    return this.#restaurantList;
  }
}
