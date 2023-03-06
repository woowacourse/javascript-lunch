import { RestaurantType } from "../type";
import { getFormData } from "../util/form";
import { validateName } from "../validator";
import { initialRestaurantData } from "../constant/initialRestaurants";
import {
  getAllRestaurantsInLocalStorage,
  saveRestaurantsInLocalStorage,
} from "./localStorageController";
import {
  renderNewRestaurant,
  renderRestaurantList,
} from "../ui/restaurantListRenderer";
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
    renderNewRestaurant(restaurantInfo);

    this.updateRestaurantList([...this.restaurantList, restaurantInfo]);
  }

  saveRestaurantList() {
    if (!localStorage.length) {
      this.restaurantList.forEach((restaurant: RestaurantType) =>
        saveRestaurantsInLocalStorage(restaurant)
      );
    }
  }

  sortRestaurantList(selectedOption: string) {
    if (selectedOption === NAME) {
      this.updateRestaurantList(sortByName(this.restaurantList));
    }

    if (selectedOption === DISTANCE) {
      this.updateRestaurantList(sortByDistance(this.restaurantList));
    }
  }

  filterRestaurantList(selectedCategory: string) {
    filterCategory(selectedCategory);
  }

  updateRestaurantList(restaurantList: RestaurantType[]) {
    this.restaurantList = restaurantList;
    renderRestaurantList(this.restaurantList);
  }
}
