import { RestaurantType } from "../type";
import { getFormData } from "../util/form";
import { validateName } from "../validator";
import { initialRestaurantData } from "../constant/initialRestaurants";
import { saveRestaurantsInLocalStorage } from "./localStorageController";
import { renderRestaurantList } from "../component/restaurantList";
import { updateRestaurantList } from "./filter";
import { handleModalCancelButtonClick } from "../modal";
import { findLocalStorageKeys } from "../util/findKeyInLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constant";
const { RESTAURANT } = LOCAL_STORAGE_KEY;

export default class RestaurantsController {
  private static instance: RestaurantsController;
  private restaurantList: RestaurantType[] = [];

  private constructor() {
    if (!RestaurantsController.instance) {
      RestaurantsController.instance = this;
    }
    this.initRestaurantsInfo();
  }

  public static getInstance() {
    if (!RestaurantsController.instance) {
      RestaurantsController.instance = new RestaurantsController();
    }

    return RestaurantsController.instance;
  }

  private initRestaurantsInfo() {
    if (findLocalStorageKeys(RESTAURANT).length) {
      updateRestaurantList();
    } else {
      this.restaurantList = initialRestaurantData;
      renderRestaurantList(initialRestaurantData);
    }

    this.saveRestaurantList();
  }

  saveRestaurantList() {
    if (!localStorage.length) {
      this.restaurantList.forEach((restaurant: RestaurantType) =>
        saveRestaurantsInLocalStorage(restaurant)
      );
    }
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

    updateRestaurantList();
  }
}
