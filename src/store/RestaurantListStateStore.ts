import restaurantListHelper from "../domain/RestaurantListHelper";
import LocalStorageService from "../services/localStorageService";
import { Irestaurant } from "../types/restaurant";

class RestaurantListStateStore {
  #restaurantList: Irestaurant[];
  #restaurantNumber: number;

  constructor() {
    this.#restaurantList = LocalStorageService.getData();
    this.#restaurantNumber = this.#restaurantList.length;
  }

  setNewData(restaurantList: Irestaurant[]) {
    this.#restaurantList = restaurantList;

    LocalStorageService.setData(this.#restaurantList);
  }

  setNewNumber() {
    this.#restaurantNumber += 1;
  }

  getListData() {
    return this.#restaurantList;
  }

  getIdNumber() {
    return this.#restaurantNumber;
  }

  getfilteredData() {
    return restaurantListHelper.allFilteredData(this.#restaurantList);
  }
}

const restaurantListStateStore = new RestaurantListStateStore();

export default restaurantListStateStore;
