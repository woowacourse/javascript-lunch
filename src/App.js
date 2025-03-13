import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import {
  filterAndSortRestaurants,
  restaurants,
} from "./domains/restaurants.ts";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import FilterBar from "./components/FilterBar.js";
import TabBarView from "./components/TabBarView.js";

class App {
  #restaurants;
  #$target;
  #selectedCategory = "전체";
  #selectedSorting = "name";

  constructor($target) {
    this.#$target = $target;
    this.#restaurants = restaurants;

    this.#$target.insertAdjacentHTML("beforeend", this.#template());
    this.#mount();
  }

  #template() {
    return /*html*/ `
      ${Header()}
      ${TabBarView()}
      <main></main>
      <div id="modal"></div>
    `;
  }

  #mount() {
    const $gnbButton = this.#$target.querySelector(".gnb__button");
    const $listTab = this.#$target.querySelector("#list-tab");
    const $favoriteTab = this.#$target.querySelector("#favorite-tab");

    $listTab.addEventListener("click", () => this.#switchTab("list"));
    $favoriteTab.addEventListener("click", () => this.#switchTab("favorite"));

    const $addModal = new AddRestaurantModal(
      document.querySelector("#modal"),
      this.#addRestaurant.bind(this)
    );

    $gnbButton.addEventListener("click", () => $addModal.open());

    this.#renderMainArea();
  }

  #switchTab(type) {
    const $listTab = this.#$target.querySelector("#list-tab");
    const $favoriteTab = this.#$target.querySelector("#favorite-tab");

    if (type === "list") {
      $listTab.classList.add("active");
      $favoriteTab.classList.remove("active");
      this.#renderMainArea();
      return;
    }

    $listTab.classList.remove("active");
    $favoriteTab.classList.add("active");
    this.#renderFavoriteList();
  }

  #renderMainArea() {
    const $main = document.querySelector("main");
    $main.replaceChildren();

    new FilterBar($main, {
      onCategoryChange: (selected) => {
        this.#selectedCategory = selected;
        this.#renderRestaurantList();
      },
      onSortingChange: (selected) => {
        this.#selectedSorting = selected;
        this.#renderRestaurantList();
      },
    });

    this.#renderRestaurantList();
  }

  #renderFavoriteList() {
    const $main = document.querySelector("main");
    $main.replaceChildren();

    const favorites = this.#restaurants.filter(
      (restaurant) => restaurant.isFavorite
    );
    this.#renderList(favorites);
  }

  #renderRestaurantList() {
    const filtered = filterAndSortRestaurants(
      this.#restaurants,
      this.#selectedCategory,
      this.#selectedSorting
    );
    this.#renderList(filtered);
  }

  #renderList(restaurants) {
    const $main = document.querySelector("main");
    const $oldContainer = $main.querySelector(".restaurant-list-container");

    const $newList = RestaurantList(restaurants, {
      onToggleFavorite: this.#toggleFavorite.bind(this),
      onDeleteRestaurant: this.#deleteRestaurant.bind(this),
    });

    if ($oldContainer) {
      $main.replaceChild($newList, $oldContainer);
    } else {
      $main.appendChild($newList);
    }
  }

  #toggleFavorite(clickedId) {
    const target = this.#restaurants.find(
      (restaurant) => restaurant.id === clickedId
    );
    if (!target) return;

    target.isFavorite = !target.isFavorite;

    this.#renderList(
      this.#isFavoriteTabActive()
        ? this.#restaurants.filter((r) => r.isFavorite)
        : filterAndSortRestaurants(
            this.#restaurants,
            this.#selectedCategory,
            this.#selectedSorting
          )
    );
  }

  #deleteRestaurant(clickedId) {
    this.#restaurants = this.#restaurants.filter(
      (restaurant) => restaurant.id !== clickedId
    );
    this.#renderList(
      this.#isFavoriteTabActive()
        ? this.#restaurants.filter((r) => r.isFavorite)
        : filterAndSortRestaurants(
            this.#restaurants,
            this.#selectedCategory,
            this.#selectedSorting
          )
    );
  }

  #isFavoriteTabActive() {
    return this.#$target
      .querySelector("#favorite-tab")
      .classList.contains("active");
  }

  #addRestaurant(newRestaurant) {
    this.#restaurants.push(newRestaurant);
    this.#renderRestaurantList();
  }
}

export default App;
