import { RestaurantProp, Values } from "../../types/types.ts";
import Restaurant from "./Restaurant.ts";
import { postData, getAllData } from "../util/dataRepository.ts";

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

export class RestaurantList {
  private dataList: RestaurantProp[];
  private subscribers: ((data: RestaurantProp[]) => void)[] = [];
  private viewState: Values<typeof VIEW_STATE> = VIEW_STATE.all;
  private sortedFlag: Values<typeof SORTED> = SORTED.name;
  private category: Values<typeof CATEGORY> = CATEGORY.all;

  constructor() {
    const restaurantDataList = getAllData();

    this.dataList = restaurantDataList.map((restaurantData: RestaurantProp) =>
      new Restaurant(restaurantData).getData()
    );
  }

  getFavoriteRestaurantList() {
    const favoriteList = this.dataList.filter(
      (restaurantData: RestaurantProp) => restaurantData.isFavorite
    );

    return favoriteList;
  }

  getRestaurantById(id: number | string) {
    return this.dataList.find(
      (restaurantData: RestaurantProp) => restaurantData.id === id
    );
  }

  setViewState(viewState: Values<typeof VIEW_STATE>) {
    this.viewState = viewState;
  }

  setCategory(category: Values<typeof CATEGORY>) {
    this.category = category;
  }

  setSortedFlag(sortedFlag: Values<typeof SORTED>) {
    this.sortedFlag = sortedFlag;
  }

  addRestaurant(data: RestaurantProp) {
    const restaurantData = new Restaurant(data);
    this.dataList.push(restaurantData.getData());

    postData(this.dataList);
  }

  toggleFavorite(id: number | string) {
    const targetData = this.dataList.find(
      (restaurantData) => restaurantData.id === id
    );
    if (targetData) {
      targetData.isFavorite = !targetData?.isFavorite;
      postData(this.dataList);
    }
  }

  removeRestaurant(id: number | string) {
    this.dataList = this.dataList.filter((restaurant) => restaurant.id !== id);

    postData(this.dataList);
  }

  renderRestaurantList() {
    const restaurantDataList =
      this.viewState === VIEW_STATE.favorite
        ? this.getFavoriteRestaurantList()
        : this.dataList;

    if (this.category === CATEGORY.all) {
      this.notify(this.sortRestaurantList(restaurantDataList));
      return;
    }

    const filteredList = restaurantDataList.filter(
      (restaurantData) => restaurantData.category === this.category
    );
    const sortedFilteredList = this.sortRestaurantList(filteredList);
    this.notify(sortedFilteredList);
  }

  sortRestaurantList(dataList: RestaurantProp[]) {
    const sortFunctions: Record<
      Values<typeof SORTED>,
      (a: RestaurantProp, b: RestaurantProp) => number
    > = {
      [SORTED.distance]: (a, b) => a.distance - b.distance,
      [SORTED.name]: (a, b) => a.name.localeCompare(b.name, "ko"),
    };

    return dataList.sort(sortFunctions[this.sortedFlag]);
  }

  subscribe(callback: (data: RestaurantProp[]) => void) {
    this.subscribers.push(callback);
  }

  notify(data: RestaurantProp[]) {
    this.subscribers.forEach((callback) => callback(data));
  }
}

const restaurantDataList = new RestaurantList();
export default restaurantDataList;
