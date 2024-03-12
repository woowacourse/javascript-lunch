import restaurantListHelper from "../domain/RestaurantListHelper";
import RestaurantListStorageService from "../services/restaurantListStorageService";
import { Irestaurant } from "../types/restaurant";

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
    return restaurantListHelper.allFilteredData(this.#restaurantList);
  }

  addNewRestaurant(restaurant: Irestaurant) {
    const prevData = this.#restaurantList;
    const newData = [...prevData, restaurant];
    this.#restaurantList = newData;

    RestaurantListStorageService.setData(newData);
  }

  updateListData(id: number) {
    const index = this.#restaurantList.findIndex((item) => item.id === id);
    this.#restaurantList[index].isLike = !this.#restaurantList[index].isLike;

    RestaurantListStorageService.setData(this.#restaurantList);
  }
}

const restaurantListStateStore = new RestaurantListStateStore();

export default restaurantListStateStore;
