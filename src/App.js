import Header from "./components/Header.js";
import TabBarView from "./components/TabBar/index.js";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import FilterBarManager from "./components/FilterBar/FilterBarManager.js";
import TabManager from "./components/TabBar/TabManager.js";
import RestaurantManager from "./components/RestaurantList/RestaurantManager.js";
import TabBar from "./components/TabBar/index.js";

class App {
  #$target;
  #filterBarManager;
  #tabManager;
  #restaurantManager;

  constructor($target) {
    this.#$target = $target;
    this.#$target.insertAdjacentHTML("beforeend", this.#template());

    this.#filterBarManager = new FilterBarManager();
    this.#restaurantManager = new RestaurantManager(this.#filterBarManager);
    this.#tabManager = new TabManager(
      this.#restaurantManager,
      this.#renderMainArea.bind(this)
    );

    this.#mount();
  }

  #template() {
    return /*html*/ `
      ${Header()}
      ${TabBar()}
      <main></main>
      <div id="modal"></div>
    `;
  }

  #mount() {
    const $gnbButton = this.#$target.querySelector(".gnb__button");

    const $addModal = new AddRestaurantModal(
      document.querySelector("#modal"),
      this.#restaurantManager.handleAddRestaurant.bind(this.#restaurantManager)
    );

    $gnbButton.addEventListener("click", () => $addModal.open());
    this.#renderMainArea();
  }

  #renderMainArea() {
    const $main = document.querySelector("main");
    $main.replaceChildren();

    this.#filterBarManager.render(
      $main,
      this.#restaurantManager.updateList.bind(this.#restaurantManager)
    );
    this.#restaurantManager.renderRestaurantList($main);
  }
}

export default App;
