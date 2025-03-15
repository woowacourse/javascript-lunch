import Modal from "./components/Modal.js";
import RestaurantList from "./stores/RestaurantList.js";

import restaurantData from "./data/restaurantData.js";
import querySelector from "./utils/querySelector.js";
import { modalHandler } from "./handlers/modalHandler.ts";
import { restaurantHandler } from "./handlers/restaurantHandler.ts";
import { filterAndSortHandler } from "./handlers/filterAndSortHandler.ts";
import { RestaurantItem } from "./types/restaurantItem.js";
import { FilterAndSortOptions } from "./types/filterAndSortOptions.js";

addEventListener("load", () => {
  const restaurantList = new RestaurantList(restaurantData);
  const categoryFilter = querySelector("#category-filter");
  const sortingFilter = querySelector("#sorting-filter");

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

    sortedList.forEach((restaurant: RestaurantItem) => {
      restaurantHandler.addRestaurantItem(restaurant);
    });
  };

  renderRestaurantList(
    restaurantList.list,
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
          restaurantList.list,
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

    querySelector(".modal-form").addEventListener("submit", (e: Event) =>
      restaurantHandler.uploadRestaurant(restaurantList, e)
    );
  });

  querySelector(".modal-backdrop").addEventListener(
    "click",
    modalHandler.closeModal
  );
});
