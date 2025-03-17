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

class RestaurantList {
  #items;
  #totalTab;
  #category;

  constructor() {
    if (!localStorage.getItem("restaurantList")) {
      localStorage.setItem(
        "restaurantList",
        JSON.stringify(MOCK_ITEM.restaurantList)
      );
    }
    this.#totalTab = true;
    this.#category = "선택해 주세요";
    this.#items = JSON.parse(localStorage.getItem("restaurantList") || "[]");

    this.sortByName();
    this.renderTab();
  }

  setLocalStorage() {
    localStorage.setItem("restaurantList", JSON.stringify(this.#items));
  }

  render() {
    const el = $(".restaurant-list");

    let data = this.#totalTab
      ? this.getTotalTabData()
      : this.getFavoriteTabData();

    el.innerHTML = data.map(LunchInfoCard).join("");

    data.forEach((item: Restaurant) => {
      const $li = document.getElementById(`restaurant_${item.name}`);

      new FavoriteButton($li, item.name, item.favorite, this);

      $li?.addEventListener("click", (event) => {
        const target = event.target as Element;
        if (target.closest(".child-exclude")) {
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

  resetFilter() {
    this.#items = JSON.parse(localStorage.getItem("restaurantList") || "[]");
    this.#category = "선택해 주세요";
    this.render();
  }

  getFavoriteTabData() {
    const filteredData = this.filter();
    return filteredData.filter(
      (restaurant: Restaurant) => restaurant.favorite === true
    );
  }

  getTotalTabData() {
    const filteredData = this.filter();

    return filteredData;
  }

  renderTab() {
    const $el = toElement(`
      <div class="tab--button-container"/>`);
    append($el, TabButton("totalTab"), TabButton("favoriteTab"));
    $("body").prepend($el);

    const $leftButton = document.getElementById("button_모든 음식점");
    const $rightButton = document.getElementById("button_자주 가는 음식점");

    $leftButton?.classList.add("focus");

    $rightButton?.addEventListener("click", () => {
      $leftButton?.classList.remove("focus");
      $rightButton?.classList.add("focus");
      this.#totalTab = false;
      this.render();
    });
    $leftButton?.addEventListener("click", () => {
      $leftButton?.classList.add("focus");
      $rightButton?.classList.remove("focus");
      this.#totalTab = true;
      this.render();
    });
  }

  add(newRestaurant: Restaurant) {
    this.#items.push(newRestaurant);
    localStorage.setItem("restaurantList", JSON.stringify(this.#items));
    this.render();
  }

  filterByCategory(category: Category) {
    this.#category = category;

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

  filter() {
    if (this.#category === "선택해 주세요") {
      return this.#items;
    }
    return this.#items.filter(
      ({ category: c }: Restaurant) => c === this.#category
    );
  }

  remove(targetName: string, modalId: string) {
    Modal.close(modalId);
    this.#items = this.#items.filter(
      (restaurnat: Restaurant) => restaurnat.name !== targetName
    );
    this.setLocalStorage();
    this.render();
  }

  changeFavoriteState(targetName: string) {
    this.#items = this.#items.map((restaurant: Restaurant) =>
      restaurant.name === targetName
        ? { ...restaurant, favorite: !restaurant.favorite }
        : restaurant
    );
    this.setLocalStorage();
    this.render();
  }
}

export default RestaurantList;
