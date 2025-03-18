import createRestaurantItem from "./item/restaurantItem.ts";
import type {
  CategoryFilter,
  Restaurant,
  SortedOption,
} from "../../../types/type.ts";
import { getElement } from "../../../utils/dom.ts";
import { STORAGE_KEY } from "../../../settings/settings.ts";
import { setStorage } from "../../../utils/storage.ts";
import {
  filterRestaurantList,
  getRestaurantList,
  sortRestaurantList,
} from "../../../utils/restaurant.ts";

interface CurrentRestaurantListState {
  categoryFilter: CategoryFilter;
  sortedOption: SortedOption;
  favoriteRenderMode: boolean;
  renderedRestaurantList: Restaurant[];
}

function restaurantListRenderer() {
  const currentState: CurrentRestaurantListState = {
    categoryFilter: "전체",
    sortedOption: "name",
    favoriteRenderMode: false,
    renderedRestaurantList: [],
  };

  function createRestaurantList(restaurantList: Restaurant[]) {
    const $restaurantList = createElement("ul", {
      className: "restaurant-list",
    });

    if (!restaurantList.length) {
      return createElement("p", {
        className: "restaurant-list-empty",
        textContent: "등록된 음식점이 없습니다.",
      });
    }

    restaurantList.forEach((restaurantInfo) =>
      $restaurantList.appendChild(createRestaurantItem(restaurantInfo))
    );

    return $restaurantList;
  }

  function renderRestaurantList(restaurantList: Restaurant[]) {
    const restaurantListContainer = getElement(".restaurant-list-container");
    const filteredList = filterRestaurantList(
      restaurantList,
      currentState.categoryFilter
    );
    const sortedList = sortRestaurantList(
      filteredList,
      currentState.sortedOption
    );

    if (currentState.favoriteRenderMode) {
      const favoriteList = sortedList.filter(({ isFavorite }) => isFavorite);
      restaurantListContainer?.replaceChildren(
        createRestaurantList(favoriteList)
      );
      currentState.renderedRestaurantList = favoriteList;
      return;
    }

    restaurantListContainer?.replaceChildren(createRestaurantList(sortedList));
    currentState.renderedRestaurantList = sortedList;
  }

  function addRestaurantItem(restaurantInfo: Restaurant) {
    const prevList = getRestaurantList();
    const newList = [...prevList, restaurantInfo];
    setStorage(STORAGE_KEY.RESTAURANTS, newList);
    renderRestaurantList(newList);
  }

  function setCategoryFilter(categoryFilter: CategoryFilter) {
    currentState.categoryFilter = categoryFilter;
    renderRestaurantList(getRestaurantList());
  }

  function setSortedOption(sortedOption: SortedOption) {
    currentState.sortedOption = sortedOption;
    renderRestaurantList(getRestaurantList());
  }

  function toggleFavoriteRenderMode() {
    currentState.favoriteRenderMode = !currentState.favoriteRenderMode;
    renderRestaurantList(getRestaurantList());
  }

  function getFavoriteRenderMode() {
    return currentState.favoriteRenderMode;
  }

  return {
    createRestaurantList,
    renderRestaurantList,
    addRestaurantItem,
    setCategoryFilter,
    setSortedOption,
    toggleFavoriteRenderMode,
    getFavoriteRenderMode,
  };
}

export const {
  createRestaurantList,
  renderRestaurantList,
  addRestaurantItem,
  setCategoryFilter,
  setSortedOption,
  toggleFavoriteRenderMode,
  getFavoriteRenderMode,
} = restaurantListRenderer();
