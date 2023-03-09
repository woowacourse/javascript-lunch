import "../css/reset.css";
import "../css/style.css";
import "./assets/add-button.png";
import "./assets/category-asian.png";
import "./assets/category-chinese.png";
import "./assets/category-etc.png";
import "./assets/category-japanese.png";
import "./assets/category-korean.png";
import "./assets/category-western.png";
import "./assets/favorite-icon-filled.png";
import "./assets/favorite-icon-lined.png";

import { updateRestaurantList } from "./domain/filter";
import { saveSelectedOption } from "./domain/localStorageController";
import RestaurantsController, {
  controlRestaurants,
} from "./domain/RestaurantsController";
import {
  handleModalCancelButtonClick,
  handleModalOpenButtonClick,
} from "./modal/newRestaurantModalHandler";
import {
  executeChangeEventListener,
  executeClickEventListener,
  executeSubmitEventListener,
} from "./util/eventListener";
import { $ } from "./util/selector";
import { LOCAL_STORAGE_KEY, SELECTED_OPTION } from "./constant";
const { CATEGORY, SORT } = LOCAL_STORAGE_KEY;
const { NAME, All_CATEGORIES } = SELECTED_OPTION;

const App = {
  restaurantsController: RestaurantsController.getInstance(),

  init() {
    this.initEventListeners();
    this.initLocalStorage();
  },

  initEventListeners() {
    this.controlNewRestaurantModal();
    this.controlFilter();
    controlRestaurants();
  },

  initLocalStorage() {
    const selectedCategory = localStorage.getItem(CATEGORY) as string | null;
    saveSelectedOption(CATEGORY, selectedCategory ?? All_CATEGORIES);

    const selectedSort = localStorage.getItem(SORT) as string | null;
    saveSelectedOption(SORT, selectedSort ?? NAME);
  },

  controlNewRestaurantModal() {
    executeClickEventListener($(".gnb__button"), () =>
      handleModalOpenButtonClick(".modal")
    );

    executeClickEventListener($(".button--secondary"), () =>
      handleModalCancelButtonClick(".modal")
    );

    executeClickEventListener($(".modal-backdrop"), () =>
      handleModalCancelButtonClick(".modal")
    );

    executeSubmitEventListener("#new-restaurant-form", (event: Event) => {
      this.restaurantsController.addNewRestaurant(event);
    });
  },

  controlFilter() {
    executeChangeEventListener(
      "#sorting-filter",
      (selectedSort: string | number) => {
        saveSelectedOption(SORT, selectedSort as string);
        updateRestaurantList();
      }
    );

    executeChangeEventListener(
      "#category-filter",
      (selectedCategory: string | number) => {
        saveSelectedOption(CATEGORY, selectedCategory as string);
        updateRestaurantList();
      }
    );
  },
};

App.init();
