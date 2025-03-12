import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import { restaurants } from "./domains/restaurants.ts";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import RestaurantItem from "./components/RestaurantItem.js";
import FilterBar from "./components/FilterBar.js";

class App {
  #restaurants;
  #$target;

  constructor($target) {
    this.#$target = $target;
    this.#restaurants = restaurants;

    this.#$target.insertAdjacentHTML("beforeend", this.#template());
    this.#componentDidMount();
  }

  #template() {
    return /*html*/ `
      ${Header()}
      <main></main>
      <div id="modal"></div>
    `;
  }

  #componentDidMount() {
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
    const $filterBar = new FilterBar($main, {
      onCategoryChange: (selected) => {
        console.log("카테고리 바뀜: ", selected);
        // 여기에서 식당 리스트 필터링 로직 등등
      },
      onSortingChange: (selected) => {
        console.log("정렬 바뀜: ", selected);
        // 여기서 정렬 로직 등등
      },
    });
    $main.insertAdjacentHTML("beforeend", RestaurantList(this.#restaurants));
  }

  #addRestaurant(newRestaurant) {
    this.#restaurants.push(newRestaurant);

    const $restaurantList = document.querySelector("#restaurant-list");
    $restaurantList.insertAdjacentHTML(
      "afterbegin",
      RestaurantItem(newRestaurant)
    );
  }
}

export default App;
