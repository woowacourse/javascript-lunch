import { RESTAURANT_DATA } from '../../public/restaurantData';

class RestaurantStorage {
  #key;
  #restaurants;

  constructor() {
    this.#key = 'restaurant';
    this.#restaurants = this.#loadFromLocalStorage();
  }

  saveToStorage() {
    localStorage.setItem(this.#key, JSON.stringify(this.#restaurants));
  }

  getAllRestaurants() {
    return [...this.#restaurants];
  }

  addRestaurant(data) {
    this.#restaurants.push(data);
    this.saveToStorage();
  }

  deleteRestaurant(id) {
    this.#restaurants = this.#restaurants.filter((data) => id !== data.id);
    this.saveToStorage();
  }

  #loadFromLocalStorage() {
    const data = localStorage.getItem(this.#key);
    return data ? JSON.parse(data) : [];
  }
}

export default RestaurantStorage;
