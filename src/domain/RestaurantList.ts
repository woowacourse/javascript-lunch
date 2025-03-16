import { Category, Restaurant } from "../../types/RestaurantType.ts";
import Modal from "../component/Modal.js";
import MOCK_ITEM from "../mockItem.js";
import { $ } from "../utils/querySelectors.js";
import LunchInfoCard from "../component/LunchInfoCard.js";
import FavoriteButton from "../component/FavoriteButton.js";
import RestaurantDetail from "../component/RestaurantDetail.js";

class RestaurantList {
  #items;
  #filteringItems;

  constructor() {
    if (!localStorage.getItem("restaurantList")) {
      localStorage.setItem(
        "restaurantList",
        JSON.stringify(MOCK_ITEM.restaurantList)
      );
    }
    this.#items = JSON.parse(localStorage.getItem("restaurantList") || "[]");
    this.#filteringItems = this.#items;
    this.sortByName();
  }

  setLocalStorage() {
    localStorage.setItem("restaurantList", JSON.stringify(this.#items));
  }

  render(items: Restaurant[]) {
    const el = $(".restaurant-list");
    el.innerHTML = items.map(LunchInfoCard).join("");

    items.forEach((item) => {
      const $li = document.getElementById(`restaurant_${item.name}`);

      new FavoriteButton($li, item.name, item.favorite, this);

      $li?.addEventListener("click", (event) => {
        if (event.target?.closest(".child-exclude")) {
          return;
        }
        $("main").append(
          new Modal(
            `restaurantModal_${item.name}`,
            RestaurantDetail(item, this)
          )
        );
        Modal.open(`restaurantModal_${item.name}`);
      });
    });
  }

  add(newRestaurant: Restaurant) {
    this.#items.push(newRestaurant);
    localStorage.setItem("restaurantList", JSON.stringify(this.#items));
    this.resetFilter();
  }

  filterByCategory(category: Category) {
    this.#filteringItems = this.#items.filter(
      ({ category: c }: Restaurant) => c === category
    );
    this.render(this.#filteringItems);
  }

  resetFilter() {
    this.#filteringItems = this.#items;
    this.render(this.#items);
  }

  sortByName() {
    this.render(
      this.#filteringItems.sort((a: Restaurant, b: Restaurant) =>
        a.name.localeCompare(b.name)
      )
    );
  }

  sortByDistance() {
    this.render(
      this.#filteringItems.sort(
        (a: Restaurant, b: Restaurant) => a.distance - b.distance
      )
    );
  }

  remove(targetName: string, modalId: string) {
    Modal.close(modalId);
    this.#items = this.#items.filter(
      (restaurnat: Restaurant) => restaurnat.name !== targetName
    );
    this.setLocalStorage();
    this.render(this.#items);
  }

  changeFavoriteState(targetName: string) {
    this.#items = this.#items.map((restaurant: Restaurant) =>
      restaurant.name === targetName
        ? { ...restaurant, favorite: !restaurant.favorite }
        : restaurant
    );
    this.setLocalStorage();
    this.render(this.#items);
  }
}

export default RestaurantList;
