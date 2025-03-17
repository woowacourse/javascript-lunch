import Modal from "./components/Modal.js";
import TabButton from "./components/TabButton.js";
import NoRestaurant from "./components/NoRestaurant.js";
import restaurantStorage from "./stores/restaurantStorage.ts";
import querySelector from "./utils/querySelector.js";
import restaurantData from "./data/restaurantData.ts";

import { modalHandler } from "./handlers/modalHandler.ts";
import { restaurantHandler } from "./handlers/restaurantHandler.ts";
import { filterAndSortHandler } from "./handlers/filterAndSortHandler.ts";
import { RestaurantItem } from "./types/restaurantItem.js";
import { FilterAndSortOptions } from "./types/filterAndSortOptions.js";

addEventListener("load", () => {
  if (restaurantStorage.getRestaurantList().length === 0) {
    restaurantStorage.setRestaurantList(restaurantData);
  }

  let isFavoriteTabActive = false;

  const categoryFilter = querySelector("#category-filter");
  const sortingFilter = querySelector("#sorting-filter");
  const allTabButton = TabButton({ name: "모든 음식점", isActive: true });
  const favoriteTabButton = TabButton({
    name: "자주 가는 음식점",
    isActive: false,
  });

  querySelector(".restaurant-tab-container").append(
    allTabButton,
    favoriteTabButton
  );

  const toggleTabs = (tab: HTMLButtonElement) => {
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.classList.remove("active-tab");
    });

    isFavoriteTabActive = tab === favoriteTabButton;
    tab.classList.add("active-tab");
    querySelector(".restaurant-list").innerHTML = "";

    renderRestaurantList(
      getCurrentList(),
      categoryFilter.value,
      sortingFilter.value
    );
  };

  const getFavoriteRestaurantList = () => {
    return restaurantStorage
      .getRestaurantList()
      .filter((restaurant: RestaurantItem) => restaurant.isFavorite);
  };

  const getCurrentList = () => {
    return isFavoriteTabActive
      ? getFavoriteRestaurantList()
      : restaurantStorage.getRestaurantList();
  };

  const renderRestaurantList = (
    restaurants: RestaurantItem[],
    category: FilterAndSortOptions["category"],
    sortOption: FilterAndSortOptions["sortOption"]
  ) => {
    const filteredList = filterAndSortHandler.filterByCategory(
      restaurants,
      category
    );
    const sortedList = filterAndSortHandler.sortByOption(
      filteredList,
      sortOption
    );

    if (sortedList.length === 0) {
      querySelector(".restaurant-list").innerHTML = NoRestaurant();
      return;
    }

    sortedList.forEach((restaurant: RestaurantItem) => {
      restaurantHandler.addRestaurantItem(restaurant);
    });
  };

  renderRestaurantList(
    restaurantStorage.getRestaurantList(),
    categoryFilter.value as FilterAndSortOptions["category"],
    sortingFilter.value as FilterAndSortOptions["sortOption"]
  );

  querySelector(".restaurant-filter-container").addEventListener(
    "change",
    (e: Event) => {
      if (e.target instanceof HTMLSelectElement) {
        const categoryFilter = querySelector("#category-filter");
        const sortingFilter = querySelector("#sorting-filter");

        updateRestaurantList(
          getCurrentList(),
          categoryFilter.value,
          sortingFilter.value
        );
      }
    }
  );

  const updateRestaurantList = (
    restaurants: RestaurantItem[],
    category: FilterAndSortOptions["category"],
    sortOption: FilterAndSortOptions["sortOption"]
  ) => {
    const restaurantListElement = querySelector(
      ".restaurant-list"
    ) as HTMLUListElement;
    restaurantListElement.innerHTML = "";

    renderRestaurantList(restaurants, category, sortOption);
  };

  const modal = Modal();
  querySelector("main").appendChild(modal);

  querySelector(".gnb__button").addEventListener("click", () => {
    modalHandler.openModal();
    modalHandler.addForm();

    querySelector(".modal-form").addEventListener("submit", (e: Event) => {
      const currentCategory = categoryFilter.value;
      const currentSortOption = sortingFilter.value;

      restaurantHandler.uploadRestaurant(
        restaurantStorage.getRestaurantList(),
        e,
        isFavoriteTabActive
      );

      if (!isFavoriteTabActive) {
        updateRestaurantList(
          getCurrentList(),
          currentCategory,
          currentSortOption
        );
      }
    });
  });

  querySelector(".modal-backdrop").addEventListener(
    "click",
    modalHandler.closeModal
  );

  allTabButton.addEventListener("click", () => toggleTabs(allTabButton));
  favoriteTabButton.addEventListener("click", () =>
    toggleTabs(favoriteTabButton)
  );
});
