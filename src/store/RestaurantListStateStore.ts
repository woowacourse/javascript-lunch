import restaurantListHelper from "../domain/RestaurantListHelper";
import LocalStorageService from "../services/localStorageService";
import restaurantListService from "../services/restaurantListService";
import { Irestaurant } from "../types/restaurant";

class RestaurantListStateStore {
  #restaurantList: Irestaurant[];
  #restaurantCount: number;

  constructor() {
    this.#restaurantList = LocalStorageService.getData();
    this.#restaurantCount = this.#restaurantList.length;
  }

  getNewData() {
    this.#restaurantList = LocalStorageService.getData();
    this.#restaurantCount = this.#restaurantList.length;
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

  addNewRestaurant(restaurant: Irestaurant) {
    const prevData = this.#restaurantList;
    const newData = [...prevData, restaurant];
    this.#restaurantList = newData;

    LocalStorageService.setData(newData);
  }

  updateListData(id: number) {
    const index = restaurantListService.getListIndexById(
      id,
      this.#restaurantList,
    );
    this.#restaurantList[index].isLike = !this.#restaurantList[index].isLike;

    LocalStorageService.setData(this.#restaurantList);
  }
}

const restaurantListStateStore = new RestaurantListStateStore();

export default restaurantListStateStore;
