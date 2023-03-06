import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";
import { RestaurantForm, Category } from "./Restaurant";
import { KEY } from "../constants";

export default class RestaurantList {
  private formList: RestaurantForm[] = [];

  constructor() {
    this.init();
  }

  get listRestaurant(): RestaurantForm[] {
    return this.formList;
  }

  init() {
    const parsedRestaurants = getLocalStorage(KEY);
    if (parsedRestaurants.length !== 0)
      parsedRestaurants.forEach((restaurant: RestaurantForm) => {
        this.formList = [...this.formList, restaurant];
      });
  }

  add(restaurantInfo: RestaurantForm) {
    this.formList = [...this.formList, restaurantInfo];
    this.filterAll();
    this.categoryFilter(restaurantInfo.category);
  }

  filterAll() {
    const restaurantString = JSON.stringify(this.formList.map((info) => info));
    setLocalStorage(KEY, restaurantString);
  }

  categoryFilter(category: Category) {
    if (category === "전체") {
      this.filterAll();
      return;
    }

    const filteredList: RestaurantForm[] = this.formList.reduce(
      (arr: RestaurantForm[], curInfo: RestaurantForm) => {
        if (curInfo.category === category) {
          arr.push(curInfo);
        }
        return arr;
      },
      []
    );

    setLocalStorage(category, JSON.stringify(filteredList));
    return filteredList;
  }
}
