import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import {
  filterAndSortRestaurants,
  restaurants,
} from "./domains/restaurants.ts";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import RestaurantItem from "./components/RestaurantItem.js";
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
    this.#renderMainArea();
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
    const $main = document.querySelector("main");
    const $gnbButton = this.#$target.querySelector(".gnb__button");
    const $listTab = this.#$target.querySelector("#list-tab");
    const $favoriteTab = this.#$target.querySelector("#favorite-tab");

    $listTab.addEventListener("click", () => {
      $listTab.classList.add("active");
      $favoriteTab.classList.remove("active");
      this.#renderMainArea();
    });
    $favoriteTab.addEventListener("click", () => {
      $listTab.classList.remove("active");
      $favoriteTab.classList.add("active");
      $main.replaceChildren();
      // TODO: 즐겨찾기 목록을 렌더링하는 코드 작성.
    });

    const $modal = new AddRestaurantModal(
      document.querySelector("#modal"),
      this.#addRestaurant.bind(this)
    );

    $gnbButton.addEventListener("click", () => {
      $modal.open();
    });
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
