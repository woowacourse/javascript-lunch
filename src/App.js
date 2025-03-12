import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import {
  filterAndSortRestaurants,
  restaurants,
} from "./domains/restaurants.ts";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import RestaurantItem from "./components/RestaurantItem.js";
import FilterBar from "./components/FilterBar.js";

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
      <main></main>
      <div id="modal"></div>
    `;
  }

  #mount() {
    const $gnbButton = this.#$target.querySelector(".gnb__button");
    const $modal = new AddRestaurantModal(
      document.querySelector("#modal"),
      this.#addRestaurant.bind(this)
    );

    $gnbButton.addEventListener("click", () => {
      $modal.open();
    });

    this.#renderMainArea();
  }

  #renderMainArea() {
    const $main = document.querySelector("main");

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

  #renderRestaurantList() {
    const filtered = filterAndSortRestaurants(
      this.#restaurants,
      this.#selectedCategory,
      this.#selectedSorting
    );

    const $main = document.querySelector("main");
    const $oldContainer = $main.querySelector(".restaurant-list-container");
    const $newList = RestaurantList(filtered);

    if ($oldContainer) {
      $main.replaceChild($newList, $oldContainer);
      return;
    }
    $main.appendChild($newList);
  }

  #addRestaurant(newRestaurant) {
    this.#restaurants.push(newRestaurant);
    this.#renderRestaurantList();
  }
}

export default App;
