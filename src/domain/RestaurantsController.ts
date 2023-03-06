import { RestaurantType } from "../type";
import { getFormData } from "../util/form";
import { validateName } from "../validator";
import { initialRestaurantData } from "../constant/initialRestaurants";
import {
  getAllRestaurantsInLocalStorage,
  saveRestaurantsInLocalStorage,
  saveSelectedCategory,
} from "./localStorageController";
import { renderRestaurantList } from "../ui/restaurantListRenderer";
import { filterCategory, sortByDistance, sortByName } from "./filter";
import { LOCAL_STORAGE_KEY, SELECTED_OPTION } from "../constant";
import { handleModalCancelButtonClick } from "../ui/modal";
import { findLocalStorageKeys } from "../util/findKeyInLocalStorage";
const { NAME, DISTANCE } = SELECTED_OPTION;

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
    findLocalStorageKeys(LOCAL_STORAGE_KEY).length
      ? this.updateRestaurantList(getAllRestaurantsInLocalStorage())
      : this.updateRestaurantList(initialRestaurantData);

    this.saveRestaurantList();
  }

  public static getInstance() {
    if (!RestaurantsController.instance) {
      RestaurantsController.instance = new RestaurantsController();
    }

    return RestaurantsController.instance;
  }

  addNewRestaurant(event: Event) {
    const trimmedInfo = getFormData(event).map(([key, value]) => [
      key,
      String(value).trim(),
    ]);
    const restaurantInfo = Object.fromEntries(trimmedInfo);

    try {
      validateName(restaurantInfo.name);
    } catch (error) {
      if (error instanceof Error) return alert(error.message);
    }

    handleModalCancelButtonClick(".modal");
    saveRestaurantsInLocalStorage(restaurantInfo);
    filterCategory(localStorage.getItem("category") as string);
  }

  saveRestaurantList() {
    if (!localStorage.length) {
      this.restaurantList.forEach((restaurant: RestaurantType) =>
        saveRestaurantsInLocalStorage(restaurant)
      );
    }
  }

  sortRestaurantList(selectedSort: string) {
    if (selectedSort === NAME) {
      this.updateRestaurantList(sortByName(this.restaurantList));
    }

    if (selectedSort === DISTANCE) {
      this.updateRestaurantList(sortByDistance(this.restaurantList));
    }
  }

  updateRestaurantList(restaurantList: RestaurantType[]) {
    this.restaurantList = restaurantList;
    renderRestaurantList(this.restaurantList);
  }
}
