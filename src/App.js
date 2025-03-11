import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import { restaurants } from "./domains/restaurants.ts";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import RestaurantItem from "./components/RestaurantItem.js";

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
    const $modal = new AddRestaurantModal(document.querySelector("#modal"), {
      addRestaurant: this.#addRestaurant.bind(this),
    });

    $gnbButton.addEventListener("click", () => {
      $modal.open();
    });

    this.#renderRestaurantList();
  }

  #renderRestaurantList() {
    const $main = document.querySelector("main");

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
