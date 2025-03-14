import RestaurantList from "./index.js";
import {
  filterAndSortRestaurants,
  toggleFavorite,
  deleteRestaurant,
  addRestaurant,
  getFavoriteRestaurants,
} from "../../domains/restaurantService.ts";

class RestaurantManager {
  constructor(filterBarManager, restaurants) {
    this.filterBarManager = filterBarManager;
    this.restaurants = restaurants;
  }

  renderRestaurantList($main) {
    const filtered = filterAndSortRestaurants(
      this.restaurants,
      this.filterBarManager.getSelectedCategory(),
      this.filterBarManager.getSelectedSorting()
    );
    this.#renderList($main, filtered);
  }

  renderFavoriteList() {
    const $main = document.querySelector("main");
    $main.replaceChildren();
    const favorites = getFavoriteRestaurants(this.restaurants);
    this.#renderList($main, favorites);
  }

  updateList() {
    const $main = document.querySelector("main");

    if (this.#isFavoriteTabActive()) {
      const favorites = getFavoriteRestaurants(this.restaurants);
      this.#renderList($main, favorites);
      return;
    }

    const filtered = filterAndSortRestaurants(
      this.restaurants,
      this.filterBarManager.getSelectedCategory(),
      this.filterBarManager.getSelectedSorting()
    );
    this.#renderList($main, filtered);
  }

  #renderList($main, restaurants) {
    const $oldContainer = $main.querySelector(".restaurant-list-container");

    const $newList = new RestaurantList(restaurants, {
      onToggleFavorite: this.handleToggleFavorite.bind(this),
      onDeleteRestaurant: this.handleDeleteRestaurant.bind(this),
      updateList: this.updateList.bind(this),
    }).render();

    if ($oldContainer) {
      $main.replaceChild($newList, $oldContainer);
      return;
    }
    $main.appendChild($newList);
  }

  async handleAddRestaurant(newRestaurant) {
    this.restaurants = await addRestaurant(this.restaurants, newRestaurant);
    this.updateList();
  }

  async handleDeleteRestaurant(clickedId) {
    this.restaurants = await deleteRestaurant(this.restaurants, clickedId);
    this.updateList();
  }

  async handleToggleFavorite(clickedId) {
    this.restaurants = await toggleFavorite(this.restaurants, clickedId);
    this.updateList();
  }

  #isFavoriteTabActive() {
    return document.querySelector("#favorite-tab").classList.contains("active");
  }
}

export default RestaurantManager;
