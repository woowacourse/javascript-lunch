import RestaurantData from "./RestaurantData";

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
    const dataList = JSON.parse(localStorage.getItem("restaurantData"));
    this.#dataList = dataList.map((data) => {
      return this.createData(data);
    });
  }

  getDataList() {
    return this.#dataList.map((restaurantData) => restaurantData.getData());
  }

  getFavoriteDataList() {
    const favoriteList = this.getDataList().filter(
      (restaurantData) => restaurantData.isFavorite
    );

    return favoriteList;
  }

  getFilteredDataList() {
    const restaurantDataList =
      this.#viewState === VIEW_STATE.favorite
        ? this.getFavoriteDataList()
        : this.getDataList();

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
      (restaurantData) => restaurantData.getData().id === id
    );
    targetData.changeFavorite();

    this.getFilteredDataList();
  }

  getDataById(id) {
    return this.#dataList
      .find((restaurantData) => restaurantData.getData().id === id)
      .getData();
  }

  addData(data) {
    this.#dataList.push(this.createData(data));

    this.getFilteredDataList();
  }

  removeDataById(id) {
    this.#dataList = this.#dataList.filter(
      (restaurant) => restaurant.getData().id !== id
    );
  }

  createData(data) {
    return new RestaurantData({
      id: data.id,
      name: data.name,
      distance: data.distance,
      description: data.description,
      link: data.link,
      category: data.category,
      isFavorite: data.isFavorite ?? false,
    });
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
