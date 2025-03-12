class RestaurantList {
  #restaurantList = [];
  constructor(restaurantList = []) {
    this.#restaurantList = restaurantList;
  }

  add(restaurant) {
    this.#restaurantList.push(restaurant);
  }

  get list() {
    return [...this.#restaurantList];
  }
}

export default RestaurantList;
