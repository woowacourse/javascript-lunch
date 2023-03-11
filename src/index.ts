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

import { updateRestaurants } from "./domain/filter";
import { saveSelectedOption } from "./domain/localStorageController";
import RestaurantsController from "./domain/RestaurantsController";
import {
  handleModalCancelButtonClick,
  handleModalOpenButtonClick,
} from "./domain/newRestaurantModalController";
import { executeEventListener } from "./util/eventListener";
import { $ } from "./util/selector";
import { LOCAL_STORAGE_KEY, SELECTED_OPTION } from "./constant";
import { renderTabButtons } from "./component/restaurantTabButton";
import { initRestaurantInfoModal } from "./component/restaurantInfoModal";
import { CategoryOptionType, SortType } from "./type";
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
    renderTabButtons();
    initRestaurantInfoModal();
  },

  initLocalStorage() {
    const selectedCategory = localStorage.getItem(
      CATEGORY
    ) as CategoryOptionType;
    saveSelectedOption(CATEGORY, selectedCategory ?? All_CATEGORIES);

    const selectedSort = localStorage.getItem(SORT) as SortType;
    saveSelectedOption(SORT, selectedSort ?? NAME);
  },

  controlNewRestaurantModal() {
    executeEventListener($(".gnb__button")!, {
      type: "click",
      listener: () => handleModalOpenButtonClick(".modal"),
    });

    [$(".button--secondary"), $(".modal-backdrop")].forEach((el) =>
      executeEventListener(el!, {
        type: "click",
        listener: () => handleModalCancelButtonClick(".modal"),
      })
    );

    executeEventListener($("#new-restaurant-form")!, {
      type: "submit",
      listener: (event) => this.restaurantsController.addNewRestaurant(event),
    });
  },

  controlFilter() {
    executeEventListener($("#sorting-filter")!, {
      type: "change",
      listener: (event) => {
        saveSelectedOption(SORT, (event.target as HTMLOptionElement).value);
        updateRestaurants();
      },
    });

    executeEventListener($("#category-filter")!, {
      type: "change",
      listener: (event) => {
        saveSelectedOption(CATEGORY, (event.target as HTMLOptionElement).value);
        updateRestaurants();
      },
    });
  },
};

App.init();
