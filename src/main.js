import { DOM } from "./utils/dom.js";
import Modal from "./component/Modal.js";
import Header from "./component/Header.js";
import AddLunchModalForm from "./component/AddLunchModal/AddLunchModalForm.js";
import RestaurantList from "./component/RestaurantList.js";
import FilterSelect from "./component/FilterSelect.js";
import {
  CATEGORY_FILTER_DROPDOWN_LIST,
  SORT_FILTER_DROPDOWN_LIST,
} from "./constants/dropdownList.js";
import { $, $$ } from "./utils/querySelectors.js";
import RestaurantListUtils from "./utils/RestaurantListUtils.js";
import data from "./data.js";
import DetailModalContent from "./component/DetailModal/DetailModalContent.js";
import LocalStorage from "./utils/LocalStorage.ts";
import { RESTAURANT_LIST_KEY } from "./constants/constants.js";
import state from "./state.ts";
import Renderer from "./utils/Renderer.js";

DOM.$body.prepend(Header.create());
initLocalStorage();
initNavigationButton();
initFilterSelect();
initRestaurantList();
initFavoriteList();
initAddLunchModal();
initDetailModal();

function initLocalStorage() {
  if (LocalStorage.getJSON(RESTAURANT_LIST_KEY) === null)
    LocalStorage.setJSON(RESTAURANT_LIST_KEY, data.restaurantList);
}

function initNavigationButton() {
  $(".navigation-bar-container").addEventListener("click", (e) => {
    $$("main section").forEach((section) => (section.style.display = "none"));
    if (e.target.classList.contains("all_restaurant_nav")) {
      state.setCurrentRestaurantListId("allRestaurant");
      DOM.$filterContainer.style.display = "flex";
      DOM.$restaurantContainer.style.display = "block";
    }

    if (e.target.classList.contains("favorite_restaurant_nav")) {
      state.setCurrentRestaurantListId("favoriteRestaurant");
      DOM.$favoriteContainer.style.display = "block";
    }

    Renderer.restaurantList();

    $$(".navigation__button").forEach((btn) =>
      btn.classList.remove("activated")
    );
    e.target.classList.add("activated");
  });
}

function initFilterSelect() {
  const categoryFilter = FilterSelect.create({
    id: "category-filter",
    name: "category",
    dropdownList: CATEGORY_FILTER_DROPDOWN_LIST,
  });

  const sortingFilter = FilterSelect.create({
    id: "sorting-filter",
    name: "sorting",
    dropdownList: SORT_FILTER_DROPDOWN_LIST,
  });

  DOM.$filterContainer.append(categoryFilter);
  DOM.$filterContainer.append(sortingFilter);
}

function initRestaurantList() {
  DOM.$restaurantContainer.append(RestaurantList.create("allRestaurant"));
  Renderer.restaurantList();
}

function initFavoriteList() {
  DOM.$favoriteContainer.append(RestaurantList.create("favoriteRestaurant"));
}

function initAddLunchModal() {
  const addLunchModalContent = AddLunchModalForm.create();
  const addLunchModalElement = Modal.create("addLunch", addLunchModalContent);
  DOM.$main.append(addLunchModalElement);
}

function initDetailModal() {
  const detailModalContent = DetailModalContent.create();
  const detailModalElement = Modal.create("detail", detailModalContent);
  DOM.$main.append(detailModalElement);
}
