import { Category, Restaurant } from "../../types/RestaurantType.ts";
import FavoriteButton from "../component/FavoriteButton.js";
import LunchInfoCard from "../component/LunchInfoCard.js";
import Modal from "../component/Modal.js";
import RestaurantDetail from "../component/RestaurantDetail.js";
import TabButton from "../component/TabButton.js";
import MOCK_ITEM from "../mockItem.js";
import append from "../utils/append.js";
import { $ } from "../utils/querySelectors.js";
import toElement from "../utils/toElement.js";
import storage from "../storage/storage.js";

class RestaurantList {
  #items: Restaurant[];
  #totalTab: boolean;
  #category: Category;
  #renderingItems: Restaurant[];

  constructor() {
    if (!storage.getItem("restaurantList")) {
      storage.setItem("restaurantList", MOCK_ITEM.restaurantList);
    }
    this.#totalTab = true;
    this.#category = "선택해 주세요";
    this.#items = storage.getItem("restaurantList") || "[]";
    this.#renderingItems = this.#items;

    this.sortByName();
  }

  setStorage() {
    storage.setItem("restaurantList", this.#items);
  }

  setCategoryTab(category: Category) {
    this.#category = category;

    this.render();
  }

  toggleTotalTab() {
    this.#totalTab = !this.#totalTab;
  }

  render() {
    const el = $(".restaurant-list");

    this.#renderingItems = this.filterByCategory();

    if (!this.#totalTab) {
      this.#renderingItems = this.filterByFavorite(this.#renderingItems);
    }

    el.innerHTML = this.#renderingItems.map(LunchInfoCard).join("");

    this.#renderingItems.forEach((item: Restaurant) => {
      const $li = document.getElementById(`restaurant_${item.name}`);

      new FavoriteButton($li, item.name, item.favorite, this);

      $li?.addEventListener("click", (event) => {
        const target = event.target as Element;
        if (target.closest(".child-exclude")) {
          return;
        }
        $("main").append(
          Modal(`restaurantModal_${item.name}`, RestaurantDetail(item, this))
        );
        Modal.open(`restaurantModal_${item.name}`);
      });
    });
  }

  resetFilter() {
    this.#items = storage.getItem("restaurantList") || "[]";
    this.#category = "선택해 주세요";
    this.render();
  }

  add(newRestaurant: Restaurant) {
    this.#items.push(newRestaurant);
    this.setStorage();
    this.render();
  }

  sortByName() {
    this.#items = this.#items.sort((a: Restaurant, b: Restaurant) =>
      a.name.localeCompare(b.name)
    );
    this.render();
  }

  sortByDistance() {
    this.#items.sort((a: Restaurant, b: Restaurant) => a.distance - b.distance);
    this.render();
  }

  filterByCategory() {
    if (this.#category === "선택해 주세요") {
      return this.#items;
    }
    return this.#items.filter(
      ({ category: c }: Restaurant) => c === this.#category
    );
  }

  filterByFavorite(data: Restaurant[]) {
    return data.filter((restaurant: Restaurant) => restaurant.favorite);
  }

  remove(targetName: string, modalId: string) {
    Modal.close(modalId);
    this.#items = this.#items.filter(
      (restaurant: Restaurant) => restaurant.name !== targetName
    );
    this.setStorage();
    this.render();
  }

  changeFavoriteState(targetName: string) {
    this.#items = this.#items.map((restaurant: Restaurant) =>
      restaurant.name === targetName
        ? { ...restaurant, favorite: !restaurant.favorite }
        : restaurant
    );
    this.setStorage();
    this.render();
  }
}

export default RestaurantList;
