import { RestaurantType } from "../type";
import { getFormData } from "../util/form";
import { validateName } from "../validator";
import { initialRestaurantData } from "../constant/initialRestaurants";
import { saveRestaurantsInLocalStorage } from "./localStorageController";
import {
  controlFavoriteIcon,
  renderRestaurantList,
} from "../component/restaurantList";
import { updateRestaurantList } from "./filter";
import {
  handleModalCancelButtonClick,
} from "../modal/newRestaurantModalHandler";
import { findLocalStorageKeys } from "../util/findKeyInLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constant";
import { $, $$ } from "../util/selector";
import { executeClickEventListener } from "../util/eventListener";
import {
  closeRestaurantInfoModal,
  deleteRestaurant,
  renderRestaurantInfoModal,
} from "../modal/restaurantInfoModal";
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
    restaurantInfo.favorite = "none";

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

export const controlRestaurants = () => {
  controlFavoriteIcon();

  $$(".restaurant").forEach((restaurant) =>
    executeClickEventListener(restaurant, (event: Event) => {
      const clickedElement = event.currentTarget as HTMLElement;
      const clickedRestaurantKey = `${RESTAURANT}${
        clickedElement.children[1].children[0].textContent as string
      }`;
      const clickedRestaurantInfo = localStorage.getItem(clickedRestaurantKey);
      const target = event.target as HTMLImageElement;

      if (target.classList.value !== "favorite-icon") {
        const body = $("body") as HTMLBodyElement;
        body.style.overflow = "hidden";

        $("#restaurant-info-modal")?.classList.add("modal--open");
        renderRestaurantInfoModal(JSON.parse(String(clickedRestaurantInfo)));
      }

      controlRestaurantInfoModal();
    })
  );
};

export const controlRestaurantInfoModal = () => {
  closeRestaurantInfoModal();
  deleteRestaurant();
};
