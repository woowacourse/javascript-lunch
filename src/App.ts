import type { Restaurant } from "./types/restaurant";
import type { CategoryOption, SortOption } from "./types/option";

import { createCustomSelect, CustomSelect } from "./components/Select";
import { createCustomModal, Modal } from "./components/modal/Modal";
import { createCustomHeader } from "./components/Header";
import {
  createRestaurantCardList,
  RestaurantCardList,
} from "./components/restaurant/RestaurantCardList";
import Restaurants from "./domain/Restaurants";
import { createRestaurantCard } from "./components/restaurant/RestaurantCard";
import {
  createRestaurantAddForm,
  RestaurantAddForm,
} from "./components/modal/RestaurantAddForm";

class App {
  #restaurants;

  #showState: {
    filter: CategoryOption;
    sort: SortOption;
  };

  constructor() {
    const restaurants = JSON.parse(localStorage.getItem("restaurants") ?? "[]");

    this.#showState = {
      filter: "전체",
      sort: "name",
    };
    this.#restaurants = new Restaurants(restaurants);

    this.init();
  }

  init() {
    createCustomSelect();
    createRestaurantAddForm();
    createCustomModal();
    createCustomHeader();
    createRestaurantCard();
    createRestaurantCardList();

    this.renderContainer();
    this.bindEvents();
  }

  bindEvents() {
    document
      .querySelector<CustomSelect>("#category-filter")
      ?.bindEvent(this.onClickFilteringOption.bind(this));

    document
      .querySelector<CustomSelect>("#sorting-filter")
      ?.bindEvent(this.onClickSortingOption.bind(this));

    document
      .querySelector<RestaurantAddForm>("form")
      ?.bindEvent(this.addNewRestaurant.bind(this));
  }

  renderContainer() {
    document.body.innerHTML = `
      <header is="custom-header" class="gnb"></header>
      <main>
        <section class="restaurant-filter-container">
          <select is="custom-select" name="category" id="category-filter" class="restaurant-filter"></select>
          <select is="custom-select" name="sorting" id="sorting-filter" class="restaurant-filter"></select>
        </section>
        <section class="restaurant-list-container">
          <ul is="restaurant-card-list" class="restaurant-list"></ul>
        </section>
        <div is="custom-modal" class="modal"></div>
      </main>
    `;

    this.renderRestaurantList();
  }

  renderRestaurantList() {
    document
      .querySelector<RestaurantCardList>(".restaurant-list")
      ?.render(this.#restaurants.getListByOption(this.#showState));
  }

  onClickSortingOption(selectedOption: string) {
    this.#showState.sort = selectedOption as SortOption;
    this.renderRestaurantList();
  }

  onClickFilteringOption(selectedOption: string) {
    this.#showState.filter = selectedOption as CategoryOption;
    this.renderRestaurantList();
  }

  addNewRestaurant(restaurant: Restaurant) {
    this.#restaurants.add(restaurant);
    localStorage.setItem(
      "restaurants",
      JSON.stringify(
        this.#restaurants.getListByOption({ filter: "전체", sort: "name" })
      )
    );

    this.renderRestaurantList();

    document.querySelector<Modal>(".modal")?.closeModal();
  }
}

export default App;
