import { RESTAURANT_DATA } from '../../public/restaurantData.js';

class RestaurantStorage {
  #key;
  #restaurants;

  constructor() {
    this.#key = 'restaurant';
    this.#restaurants = this.#loadFromLocalStorage();
  }

  saveToStorage() {
    localStorage.setItem(this.#key, JSON.stringify(this.#restaurants));
    // localStorage.setItem(this.#key, JSON.stringify(RESTAURANT_DATA));
  }

  getAllRestaurants() {
    return [...this.#restaurants];
  }

  updateStorage(data) {
    this.#restaurants = [...data].map((data) => data.getInfo());
    this.saveToStorage();
  }

  #loadFromLocalStorage() {
    const data = localStorage.getItem(this.#key);
    return data ? JSON.parse(data) : [];
  }
}

export default RestaurantStorage;
