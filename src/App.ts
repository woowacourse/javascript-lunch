import type { Category, Distance } from "./types/restaurant";
import type { CategoryOption, SortOption } from "./types/option";

import createCustomSelect from "./components/CustomSelect";
import createCustomModal from "./components/CustomModal";
import createCustomHeader from "./components/CustomHeader";
import createRestaurantCardList from "./components/RestaurantCardList";
import Restaurants from "./domain/Restaurants";

class App {
  #modal: HTMLElement | null;

  #restaurants;

  #showState: {
    filter: CategoryOption;
    sort: SortOption;
  };

  constructor() {
    const restaurants = JSON.parse(localStorage.getItem("restaurants") ?? "[]");

    this.#restaurants = new Restaurants(restaurants);
    this.#showState = {
      filter: "전체",
      sort: "name",
    };
    this.init();

    this.#modal = document.querySelector(".modal");
  }

  init() {
    createCustomSelect();
    createCustomModal();
    createCustomHeader();

    this.renderContainer();
  }

  renderContainer() {
    document.body.innerHTML = `
      <custom-header></custom-header>
      <main>
        <section class="restaurant-filter-container">
          <custom-select name="category" cid="category-filter" class="restaurant-filter"></custom-select>
          <custom-select name="sorting" cid="sorting-filter" class="restaurant-filter"></custom-select>
        </section>
        <section class="restaurant-list-container">
          ${createRestaurantCardList(
            this.#restaurants.getListByOption(this.#showState)
          )}
        </section>
        <custom-modal></custom-modal>
      </main>
    `;
  }

  onClickSortingOption(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    this.#showState.sort = event.target.value as SortOption;
    this.renderRestaurantList();
  }

  onClickFilteringOption(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    this.#showState.filter = event.target.value as CategoryOption;
    this.renderRestaurantList();
  }

  onSubmitNewRestaurant(event: Event) {
    event.preventDefault();

    this.addNewRestaurant();
    this.renderRestaurantList();

    localStorage.setItem(
      "restaurants",
      JSON.stringify(
        this.#restaurants.getListByOption({ filter: "전체", sort: "name" })
      )
    );

    this.closeModal();
    this.resetModalValue();
  }

  openModal() {
    this.#modal?.classList.add("modal--open");
  }

  closeModal() {
    this.#modal?.classList.remove("modal--open");
  }

  renderRestaurantList() {
    const restaurantListContainer = document.querySelector(
      ".restaurant-list-container"
    );

    if (restaurantListContainer === null) return;

    restaurantListContainer.innerHTML = createRestaurantCardList(
      this.#restaurants.getListByOption(this.#showState)
    );
  }

  addNewRestaurant() {
    const category = (document.getElementById("category") as HTMLSelectElement)
      .value as Category;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const distance = Number(
      (document.getElementById("distance") as HTMLSelectElement).value
    ) as Distance;
    const description = (
      document.getElementById("description") as HTMLTextAreaElement
    ).value;
    const link = (document.getElementById("link") as HTMLInputElement).value;

    this.#restaurants.add({
      category,
      name,
      distance,
      description,
      link,
    });
  }

  resetModalValue() {
    (document.getElementById("category") as HTMLSelectElement).value = "";
    (document.getElementById("name") as HTMLInputElement).value = "";
    (document.getElementById("distance") as HTMLSelectElement).value = "";
    (document.getElementById("description") as HTMLTextAreaElement).value = "";
    (document.getElementById("link") as HTMLInputElement).value = "";
  }
}

export default App;
