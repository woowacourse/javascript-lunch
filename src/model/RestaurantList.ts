import { Restaurant, RestaurantForm } from "../../types/restaurantTypes";
import { ERROR_MESSAGE, INITIAL_RESTAURANT } from "../settings/settings";
import { restaurantFormValidation } from "../validation/restaurantFormValidation";

class RestaurantList {
  readonly restaurantList: Restaurant[] = [];
  constructor(restaurantList: Restaurant[]) {
    //추가 검증작업.
    for (const item of restaurantList) {
      try {
        this.addRestaurant(restaurantFormValidation(item));
      } catch (error) {
        console.error(ERROR_MESSAGE.INVALID_DEFAULT_RESTAURANT);
      }
    }
  }
  get List() {
    return this.restaurantList;
  }
  parseRestaurantForm(restaurantForm: RestaurantForm) {
    return restaurantFormValidation(restaurantForm);
  }
  addRestaurant(restaurant: Restaurant) {
    if (this.searchRestaurant(restaurant.name))
      throw new Error(ERROR_MESSAGE.DUPLICATE_RESTAURANT);
    this.restaurantList.push(restaurant);
  }
  searchRestaurant(name: string): Restaurant | undefined {
    return this.restaurantList.find((item) => item.name === name);
  }
  toggleFavoriteRestaurant(restaurant: Restaurant) {
    restaurant.isFavorite = !restaurant.isFavorite;
  }
}
export default new RestaurantList([...INITIAL_RESTAURANT]);
