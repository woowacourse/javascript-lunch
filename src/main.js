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

DOM.$body.prepend(Header.create());
initNavigationButton();
initFilterSelect();
initRestaurantList();
initAddLunchModal();
initFavoriteList();

function initNavigationButton() {
  $(".navigation-bar-container").addEventListener("click", (e) => {
    $$("main section").forEach((section) => (section.style.display = "none"));
    if (e.target.classList.contains("all_restaurant_nav")) {
      FilterSelect.applyFilter("allRestaurant");
      DOM.$filterContainer.style.display = "flex";
      DOM.$restaurantContainer.style.display = "block";
    }
    if (e.target.classList.contains("favorite_restaurant_nav")) {
      const favoriteRestaurantList = RestaurantListUtils.getFavoriteList(
        data.restaurantList
      );
      RestaurantList.applyList("favoriteRestaurant", favoriteRestaurantList);
      DOM.$favoriteContainer.style.display = "block";
    }

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
  RestaurantList.applyData("allRestaurant");
}

function initAddLunchModal() {
  const addLunchModalContent = AddLunchModalForm.create();
  const addLunchModalElement = Modal.create("addLunch", addLunchModalContent);
  DOM.$main.append(addLunchModalElement);
}

function initFavoriteList() {
  DOM.$favoriteContainer.append(RestaurantList.create("favoriteRestaurant"));
}
