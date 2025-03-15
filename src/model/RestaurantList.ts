import type { Restaurant, RestaurantForm } from "../../types/restaurantTypes";
import { ERROR_MESSAGE } from "../settings/errorMessages";
import { restaurantFormValidation } from "../validation/restaurantFormValidation";

class RestaurantList {
  #restaurantList: Restaurant[] = [];
  constructor(restaurantList: Restaurant[]) {
    this.#restaurantList = restaurantList;
  }
  get List() {
    return this.#restaurantList;
  }
  parseRestaurantForm(restaurantForm: RestaurantForm) {
    return restaurantFormValidation(restaurantForm);
  }
  searchRestaurant(name: string): Restaurant | undefined {
    return this.#restaurantList.find((item) => item.name === name);
  }
  addRestaurant(restaurant: Restaurant) {
    if (this.searchRestaurant(restaurant.name))
      throw new Error(ERROR_MESSAGE.DUPLICATE_RESTAURANT);
    this.#restaurantList.push(restaurant);
  }
  deleteRestaurant(restaurantName: string) {
    if (!this.searchRestaurant(restaurantName))
      throw new Error(ERROR_MESSAGE.NO_RESTAURANT_FOUND);
    this.#restaurantList = [
      ...this.#restaurantList.filter((item) => item.name !== restaurantName),
    ];
  }

  toggleFavoriteRestaurant(restaurant: Restaurant) {
    restaurant.isFavorite = !restaurant.isFavorite;
  }
}
export default RestaurantList;
