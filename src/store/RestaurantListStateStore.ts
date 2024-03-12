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

  setNewData() {
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
}

const restaurantListStateStore = new RestaurantListStateStore();

export default restaurantListStateStore;
