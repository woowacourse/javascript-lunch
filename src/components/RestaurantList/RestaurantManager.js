import RestaurantList from "./index.js";
import {
  filterAndSortRestaurants,
  getFavoriteRestaurants,
} from "../../domains/restaurantUtils.ts";
import {
  deleteRestaurant,
  addRestaurant,
  toggleFavorite,
} from "../../APIs/restaurantAPI.ts";

class RestaurantManager {
  #$main;
  #filterManager;
  #restaurants;

  constructor($main, filterManager, restaurants, getIsFavoriteTabActive) {
    this.#$main = $main;
    this.#filterManager = filterManager;
    this.#restaurants = restaurants;
    this.getIsFavoriteTabActive = getIsFavoriteTabActive;
  }

  renderRestaurantList() {
    const filtered = filterAndSortRestaurants(
      this.#restaurants,
      this.#filterManager.getSelectedCategory(),
      this.#filterManager.getSelectedSorting()
    );
    this.#renderList(this.#$main, filtered);
  }

  renderFavoriteList() {
    this.#$main.replaceChildren();
    const favorites = getFavoriteRestaurants(this.#restaurants);
    this.#renderList(this.#$main, favorites);
  }

  updateList() {
    if (this.getIsFavoriteTabActive()) {
      this.renderFavoriteList();
      return;
    }

    this.renderRestaurantList();
  }

  #renderList($main, restaurants) {
    const $oldContainer = this.#$main.querySelector(
      ".restaurant-list-container"
    );

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
    this.#restaurants = await addRestaurant(this.#restaurants, newRestaurant);
    this.updateList();
  }

  async handleDeleteRestaurant(clickedId) {
    this.#restaurants = await deleteRestaurant(this.#restaurants, clickedId);
    this.updateList();
  }

  async handleToggleFavorite(clickedId) {
    this.#restaurants = await toggleFavorite(this.#restaurants, clickedId);
    this.updateList();
  }
}

export default RestaurantManager;
