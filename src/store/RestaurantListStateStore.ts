import restaurantListHelper from "../domain/RestaurantListHelper";
import LocalStorageService from "../services/localStorageService";
import { Irestaurant } from "../types/restaurant";

class RestaurantListStateStore {
  #restaurantList: Irestaurant[];
  #restaurantCount: number;

  constructor() {
    this.#restaurantList = LocalStorageService.getData();
    this.#restaurantCount = this.#restaurantList.length;
  }

  setNewDataFromLocalStorage() {
    this.#restaurantList = LocalStorageService.getData();
    this.#restaurantCount = this.#restaurantList.length;
  }

  setNewData(restaurantList: Irestaurant[]) {
    this.#restaurantList = restaurantList;
    this.#restaurantCount = restaurantList.length;

    LocalStorageService.setData(this.#restaurantList);
  }

  getListData() {
    return this.#restaurantList;
  }

  getListCount() {
    return this.#restaurantCount;
  }

  getfilteredData() {
    return restaurantListHelper.allFilteredData(this.#restaurantList);
  }
}

const restaurantListStateStore = new RestaurantListStateStore();

export default restaurantListStateStore;
