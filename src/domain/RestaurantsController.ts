import { RestaurantType } from "../type";
import { getFormData } from "../util/form";
import { validateName } from "../validator";
import { initialRestaurantData } from "../constant/initialRestaurants";
import { saveOnLocalStorage } from "../util/localStorage";
import { renderNewRestaurant } from "../ui/restaurantListRenderer";

export default class RestaurantsController {
  private static instance: RestaurantsController;
  private restaurantList: RestaurantType[] = [];

  private constructor() {
    if (!RestaurantsController.instance) {
      RestaurantsController.instance = this;
    }
    this.initRestaurantsInfos();
  }

  private initRestaurantsInfos() {
    this.restaurantList = initialRestaurantData;
    this.saveRestaurantList();
  }

  public static getInstance() {
    if (!RestaurantsController.instance) {
      RestaurantsController.instance = new RestaurantsController();
    }

    return RestaurantsController.instance;
  }

  getRestaurantList(): RestaurantType[] {
    return this.restaurantList;
  }

  addNewRestaurant(event: Event) {
    const trimmedInfo = getFormData(event).map(([key, value]) => [
      key,
      String(value).trim(),
    ]);
    const restaurantInfo = Object.fromEntries(trimmedInfo);

    validateName(restaurantInfo.name);
    saveOnLocalStorage(restaurantInfo);
    renderNewRestaurant(restaurantInfo);
  }

  saveRestaurantList() {
    if (!window.localStorage.length) {
      this.restaurantList.forEach((restaurant: RestaurantType) =>
        saveOnLocalStorage(restaurant)
      );
    }
  }
}
