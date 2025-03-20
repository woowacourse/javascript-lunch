import { sortRestaurants } from "../../domain/sortRestaurants.ts";
import { StorageController } from "../../utils/storage.ts";
import sortingFilter from "./components/filters/sortingFilter.js";
import categoryFilter from "./components/filters/categoryFilter.js";
import tabContainer from "./components/navigation/tabContainer.js";
import { renderRestaurantList } from "./components/display/restaurantList.js";
import { $ } from "../../utils/domHelpers.js";

const restaurantStorage = new StorageController("restaurants");

const renderMainPage = () => {
  const restaurants = restaurantStorage.getStorage() ?? [];
  renderRestaurantList(sortRestaurants(restaurants));
  tabContainer();

  const $filterContainer = $(".restaurant-filter-container");
  if ($filterContainer) {
    $filterContainer.appendChild(categoryFilter());
    $filterContainer.appendChild(sortingFilter());
  }
};

export default renderMainPage;
