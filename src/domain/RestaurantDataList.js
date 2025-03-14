import RestaurantData from "./RestaurantData";
import { postData, getAllData } from "../util/dataRepository";

export const VIEW_STATE = {
  all: "모든 음식점",
  favorite: "자주 가는 음식점",
};

const CATEGORY = {
  all: "전체",
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
  asian: "아시안",
  etc: "기타",
};

const SORTED = {
  name: "name",
  distance: "distance",
};

export class RestaurantDataList {
  #dataList;
  #subscribers = [];
  #viewState = VIEW_STATE.all;
  #sortedFlag = SORTED.favorite;
  #category = CATEGORY.all;

  constructor() {
    const restaurantDataList = getAllData();

    this.#dataList = restaurantDataList.map((restaurantData) =>
      new RestaurantData(restaurantData).getData()
    );
  }

  getFavoriteDataList() {
    const favoriteList = this.#dataList.filter(
      (restaurantData) => restaurantData.isFavorite
    );

    return favoriteList;
  }

  getFilteredDataList() {
    const restaurantDataList =
      this.#viewState === VIEW_STATE.favorite
        ? this.getFavoriteDataList()
        : this.#dataList;

    if (this.#category === CATEGORY.all) {
      this.notify(this.sortedDataList(restaurantDataList));
      return;
    }

    const filteredList = restaurantDataList.filter(
      (restaurantData) => restaurantData.category === this.#category
    );

    const sortedFilteredList = this.sortedDataList(filteredList);
    this.notify(sortedFilteredList);
  }

  setViewState(viewState) {
    this.#viewState = viewState;
  }

  setCategory(category) {
    this.#category = category;
  }

  setSortedFlag(sortedFlag) {
    this.#sortedFlag = sortedFlag;
  }

  sortedDataList(dataList) {
    if (this.#sortedFlag === SORTED.distance) {
      dataList.sort((a, b) => a.distance - b.distance);
    } else {
      dataList.sort((a, b) => (a.name > b.name ? 1 : -1));
    }

    return dataList;
  }

  changeFavorite(id) {
    const targetData = this.#dataList.find(
      (restaurantData) => restaurantData.id === id
    );

    targetData.isFavorite = !targetData.isFavorite;

    postData(this.#dataList);
  }

  getDataById(id) {
    return this.#dataList.find((restaurantData) => restaurantData.id === id);
  }

  addData(data) {
    const restaurantData = new RestaurantData(data);

    this.#dataList.push(restaurantData.getData());

    postData(this.#dataList);
  }

  removeDataById(id) {
    this.#dataList = this.#dataList.filter(
      (restaurant) => restaurant.id !== id
    );

    postData(this.#dataList);
  }

  subscribe(callback) {
    this.#subscribers.push(callback);
  }

  notify(data) {
    this.#subscribers.forEach((callback) => callback(data));
  }
}

const restaurantDataList = new RestaurantDataList();
export default restaurantDataList;
