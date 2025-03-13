import RestaurantList from "./RestaurantList.js";
import {
  filterAndSortRestaurants,
  toggleFavorite,
  deleteRestaurant,
  addRestaurant,
  getFavoriteRestaurants,
} from "../../domains/restaurantService.ts";

class RestaurantManager {
  constructor(filterBarManager) {
    this.filterBarManager = filterBarManager;
  }

  renderRestaurantList($main) {
    const filtered = filterAndSortRestaurants(
      this.filterBarManager.getSelectedCategory(),
      this.filterBarManager.getSelectedSorting()
    );
    this.#renderList($main, filtered);
  }

  renderFavoriteList() {
    const $main = document.querySelector("main");
    $main.replaceChildren();
    const favorites = getFavoriteRestaurants();
    this.#renderList($main, favorites);
  }

  updateList() {
    const $main = document.querySelector("main");

    if (this.#isFavoriteTabActive()) {
      const favorites = getFavoriteRestaurants();
      this.#renderList($main, favorites);
      return;
    }

    const filtered = filterAndSortRestaurants(
      this.filterBarManager.getSelectedCategory(),
      this.filterBarManager.getSelectedSorting()
    );
    this.#renderList($main, filtered);
  }

  #renderList($main, restaurants) {
    const $oldContainer = $main.querySelector(".restaurant-list-container");

    const $newList = RestaurantList(restaurants, {
      onToggleFavorite: this.handleToggleFavorite.bind(this),
      onDeleteRestaurant: this.handleDeleteRestaurant.bind(this),
    });

    if ($oldContainer) {
      $main.replaceChild($newList, $oldContainer);
      return;
    }

    $main.appendChild($newList);
  }

  handleToggleFavorite(clickedId) {
    toggleFavorite(clickedId);
    this.updateList();
  }

  handleDeleteRestaurant(clickedId) {
    deleteRestaurant(clickedId);
    this.updateList();
  }

  handleAddRestaurant(newRestaurant) {
    addRestaurant(newRestaurant);
    this.updateList();
  }

  #isFavoriteTabActive() {
    return document.querySelector("#favorite-tab").classList.contains("active");
  }
}

export default RestaurantManager;
