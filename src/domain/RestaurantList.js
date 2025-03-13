class RestaurantList {
  #restaurantList = [];
  constructor(restaurantList = []) {
    this.#restaurantList = restaurantList;
  }

  add(restaurant) {
    this.#restaurantList.push(restaurant);
  }

  filterByCategory(category) {
    if (category === "") {
      return this.#restaurantList;
    }

    return this.#restaurantList.filter(
      (restaurant) => restaurant.value.category === category
    );
  }

  filterByName() {
    return [...this.#restaurantList].sort((a, b) =>
      a.value.name.localeCompare(b.value.name)
    );
  }

  filterByDistance() {
    return [...this.#restaurantList].sort(
      (a, b) => a.value.distance - b.value.distance
    );
  }

  get list() {
    return [...this.#restaurantList];
  }
}

export default RestaurantList;
