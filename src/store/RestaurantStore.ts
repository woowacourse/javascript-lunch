import { IRestaurantInfo } from '../domain/Restaurant';
import RestaurantCatalog from '../domain/RestaurantCatalog';
import { mockingData } from '../domain/mocking';

class RestaurantStore {
  #restaurantCatalog;

  constructor() {
    this.#restaurantCatalog = new RestaurantCatalog();
    this.#initDefaultData();
  }

  addNewRestaurantToStore(restaurantInfo: IRestaurantInfo) {
    this.#restaurantCatalog.pushNewRestaurant(restaurantInfo);
    this.#updateRestaurantToLocalStorage();
  }

  #initDefaultData() {
    this.#insertDefaultData();
    this.#initRestaurantCatalogFromLocalStorage();
    this.#setLocalStorage();
  }

  #updateRestaurantToLocalStorage() {
    if (localStorage.getItem('restaurants') !== null) {
      localStorage.removeItem('restaurants');
      this.#setLocalStorage();
    }
  }

  #insertDefaultData() {
    if (!localStorage.getItem('restaurants')) {
      mockingData.forEach((data) => {
        this.#restaurantCatalog.pushNewRestaurant(data);
      });
    }
  }

  #initRestaurantCatalogFromLocalStorage() {
    const localData = localStorage.getItem('restaurants');
    if (localData) {
      JSON.parse(localData).forEach((restaurant: any) => {
        this.#restaurantCatalog.pushNewRestaurant(restaurant);
      });
    }
  }

  #setLocalStorage() {
    const restaurants = JSON.stringify(this.#restaurantCatalog.getTotalRestaurantInfo());

    localStorage.setItem('restaurants', restaurants);
  }
}

export default RestaurantStore;
