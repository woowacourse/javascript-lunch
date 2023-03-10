import { setLocalStorage } from "../utils/LocalStorage";
import Store from "../Store";
import { RestaurantForm, Category } from "../types";
import { KEY } from "../constants";

export default class RestaurantList {
  add(restaurantInfo: RestaurantForm) {
    Store.appendRestaurant(restaurantInfo);
    const restaurantString = JSON.stringify(
      Store.getRestaurantList().map((info) => info)
    );
    setLocalStorage(KEY, restaurantString);
    this.categoryFilter(restaurantInfo.category);
  }

  categoryFilter(category: Category) {
    if (category === "전체") {
      return Store.getRestaurantList();
    }

    const filteredList: RestaurantForm[] = Store.getRestaurantList().reduce(
      (arr: RestaurantForm[], curInfo: RestaurantForm) => {
        if (curInfo.category === category) {
          arr.push(curInfo);
        }
        return arr;
      },
      []
    );

    return filteredList;
  }
}
