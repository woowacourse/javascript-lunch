import { $ } from "../../../../utils/domHelpers.js";
import { StorageController } from "../../../../utils/storage.js";
import { sortRestaurants } from "../../../../domain/sortRestaurants.ts";
import restaurantItem from "../../../../components/restaurantItem.js";
import toggleFavorite from "../../../../eventHandler/toggleFavorite.ts";
import {
  CATEGORY_DEFAULT,
  SORTING_DEFAULT,
} from "../../../../constants/options.js";

const restaurantStorage = new StorageController("restaurants");

const updateRestaurantList = (isFavoriteTab = false) => {
  const restaurants = restaurantStorage.getStorage() ?? [];
  const selectedCategory = $("#category-filter")?.value || CATEGORY_DEFAULT;
  const selectedSorting = $("#sorting-filter")?.value || SORTING_DEFAULT;

  let filteredList = restaurants;

  if (isFavoriteTab) {
    filteredList = filteredList.filter((restaurant) => restaurant.isFavorite);
  }

  if (selectedCategory !== CATEGORY_DEFAULT) {
    filteredList = filteredList.filter(
      (restaurant) => restaurant.category === selectedCategory
    );
  }

  const sortedList = sortRestaurants(filteredList, selectedSorting);

  renderRestaurantList(sortedList);
};

export const renderRestaurantList = (restaurants) => {
  const $container = $(".restaurant-list");

  if (restaurants.length === 0) {
    $container.innerHTML = `
      <div class="empty-restaurant-list">
        <span>등록된 음식점이 없습니다.</span>
      </div>
    `;
    return;
  }

  $container.innerHTML = restaurants
    .map((restaurant) => restaurantItem(restaurant))
    .join("");

  document.querySelectorAll(".favorite-icon").forEach(($icon) => {
    $icon.addEventListener("click", toggleFavorite);
  });
};

export default updateRestaurantList;
