import { getItem, RESTAURANT_LIST_KEY } from "../components/utils/storage";

export default class RestaurantListModel {
  #restaurantList;

  constructor() {
    this.#restaurantList = getItem(RESTAURANT_LIST_KEY, []);
  }

  updateRestautantList(newRestaurantList) {
    this.#restaurantList = [...newRestaurantList];
  }

  getRestaurantList() {
    return this.#restaurantList;
  }
}
