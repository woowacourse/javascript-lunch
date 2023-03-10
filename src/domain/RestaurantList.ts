import { setLocalStorage } from "../utils/LocalStorage";
import Store from "../Store";
import { RestaurantForm, Category } from "../types";
import { KEY } from "../constants";

export default class RestaurantList {
  private formList: RestaurantForm[] = [];
  private store;

  constructor(store: Store) {
    this.store = store;
  }

  get listRestaurant(): RestaurantForm[] {
    return this.formList;
  }

  add(restaurantInfo: RestaurantForm) {
    this.store.appendRestaurant(restaurantInfo);
    const restaurantString = JSON.stringify(
      this.store.getRestaurantList().map((info) => info)
    );
    setLocalStorage(KEY, restaurantString);
    this.categoryFilter(restaurantInfo.category);
  }

  categoryFilter(category: Category) {
    if (category === "전체") {
      return this.store.getRestaurantList();
    }

    const filteredList: RestaurantForm[] = this.store
      .getRestaurantList()
      .reduce((arr: RestaurantForm[], curInfo: RestaurantForm) => {
        if (curInfo.category === category) {
          arr.push(curInfo);
        }
        return arr;
      }, []);

    return filteredList;
  }
}
