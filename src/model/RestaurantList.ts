import { Restaurant } from "../../types/restaurantTypes";
import { ERROR_MESSAGE, INITIAL_RESTAURANT } from "../settings/settings";

class RestaurantList {
  readonly restaurantList: Restaurant[] = [];
  constructor(restaurantList: Restaurant[]) {
    this.restaurantList = restaurantList;
  }
  get List() {
    return this.restaurantList;
  }
  addRestaurant(restaurant: Restaurant) {
    if (this.searchRestaurant(restaurant.name))
      throw new Error(ERROR_MESSAGE.DUPLICATE_RESTAURANT);
    this.restaurantList.push(restaurant);
  }
  searchRestaurant(name: string): Restaurant | undefined {
    return this.restaurantList.find((item) => item.name === name);
  }
}
export default new RestaurantList([...INITIAL_RESTAURANT]);
