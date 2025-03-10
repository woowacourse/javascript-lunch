export default class RestaurantStore {
  #restaurants = [];
  #listeners = new Set();

  addRestaurant(restaurant) {
    this.#restaurants = [...this.#restaurants, restaurant];
    this.#notifyListeners();
  }

  getRestaurants() {
    return [...this.#restaurants];
  }

  subscribe(listener) {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }

  #notifyListeners() {
    this.#listeners.forEach((listener) => listener(this.#restaurants));
  }
}
