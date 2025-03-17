import { RestaurantDataProp } from "./../../types/types";
import RestaurantData from "./RestaurantData";
import { postData, getAllData } from "../util/dataRepository";

export const VIEW_STATE = {
  all: "모든 음식점",
  favorite: "자주 가는 음식점",
} as const;

const CATEGORY = {
  all: "전체",
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
  asian: "아시안",
  etc: "기타",
} as const;

const SORTED = {
  name: "name",
  distance: "distance",
} as const;

export class RestaurantDataList {
  private dataList: RestaurantDataProp[];
  private subscribers: ((data: RestaurantDataProp[]) => void)[] = [];
  private viewState: (typeof VIEW_STATE)[keyof typeof VIEW_STATE] =
    VIEW_STATE.all;
  private sortedFlag: (typeof SORTED)[keyof typeof SORTED] = SORTED.name;
  private category: (typeof CATEGORY)[keyof typeof CATEGORY] = CATEGORY.all;

  constructor() {
    const restaurantDataList = getAllData();

    this.dataList = restaurantDataList.map(
      (restaurantData: RestaurantDataProp) =>
        new RestaurantData(restaurantData).getData()
    );
  }

  getFavoriteDataList() {
    const favoriteList = this.dataList.filter(
      (restaurantData: RestaurantDataProp) => restaurantData.isFavorite
    );

    return favoriteList;
  }

  getDataById(id: number | string) {
    return this.dataList.find(
      (restaurantData: RestaurantDataProp) => restaurantData.id === id
    );
  }

  setViewState(viewState: (typeof VIEW_STATE)[keyof typeof VIEW_STATE]) {
    this.viewState = viewState;
  }

  setCategory(category: (typeof CATEGORY)[keyof typeof CATEGORY]) {
    this.category = category;
  }

  setSortedFlag(sortedFlag: (typeof SORTED)[keyof typeof SORTED]) {
    this.sortedFlag = sortedFlag;
  }

  addData(data: RestaurantDataProp) {
    const restaurantData = new RestaurantData(data);
    this.dataList.push(restaurantData.getData());

    postData(this.dataList);
  }

  changeFavorite(id: number | string) {
    const targetData = this.dataList.find(
      (restaurantData) => restaurantData.id === id
    );
    if (targetData) {
      targetData.isFavorite = !targetData?.isFavorite;
      postData(this.dataList);
    }
  }

  removeDataById(id: number | string) {
    this.dataList = this.dataList.filter((restaurant) => restaurant.id !== id);

    postData(this.dataList);
  }

  renderRestaurantList() {
    const restaurantDataList =
      this.viewState === VIEW_STATE.favorite
        ? this.getFavoriteDataList()
        : this.dataList;

    if (this.category === CATEGORY.all) {
      this.notify(this.sortedDataList(restaurantDataList));
      return;
    }

    const filteredList = restaurantDataList.filter(
      (restaurantData) => restaurantData.category === this.category
    );
    const sortedFilteredList = this.sortedDataList(filteredList);
    this.notify(sortedFilteredList);
  }

  sortedDataList(dataList: RestaurantDataProp[]) {
    if (this.sortedFlag === SORTED.distance) {
      dataList.sort((a, b) => a.distance - b.distance);
    } else {
      dataList.sort((a, b) => (a.name > b.name ? 1 : -1));
    }

    return dataList;
  }

  subscribe(callback: (data: RestaurantDataProp[]) => void) {
    this.subscribers.push(callback);
  }

  notify(data: RestaurantDataProp[]) {
    this.subscribers.forEach((callback) => callback(data));
  }
}

const restaurantDataList = new RestaurantDataList();
export default restaurantDataList;
