import restaurantListHelper from "../domain/RestaurantListHelper";
import RestaurantListStorageService from "../services/restaurantListStorageService";
import { Irestaurant } from "../types/restaurant";

import filterState from "./FilterStateStore";

class RestaurantListStateStore {
  #restaurantList: Irestaurant[];
  #restaurantCount: number;

  constructor() {
    this.#restaurantList = RestaurantListStorageService.getData();
    this.#restaurantCount = this.#restaurantList.length;
  }

  getNewData() {
    this.#restaurantList = RestaurantListStorageService.getData();
    this.#restaurantCount = this.#restaurantList.length;
  }

  getListData() {
    return this.#restaurantList;
  }

  getListCount() {
    return this.#restaurantCount;
  }

  getfilteredData() {
    const filtereDataByCategory = restaurantListHelper.filterByCategory(
      filterState.getFilterInfo().filter,
      this.#restaurantList,
    );
    return restaurantListHelper.sortBySelectedValue(
      filterState.getFilterInfo().sort,
      filtereDataByCategory,
    );
  }

  addNewRestaurant(restaurant: Irestaurant) {
    const prevData = this.#restaurantList;
    const newData = [...prevData, restaurant];
    this.#restaurantList = newData;

    RestaurantListStorageService.setData(newData);
  }
}

const restaurantListStateStore = new RestaurantListStateStore();

export default restaurantListStateStore;
