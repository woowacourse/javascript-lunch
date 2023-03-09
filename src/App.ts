import type { Restaurant } from "./types/restaurant";
import type { CategoryOption, LikeOption, SortOption } from "./types/option";

import Restaurants from "./domain/Restaurants";

import { createSelect, Select } from "./components/Select";
import { createModal, Modal } from "./components/modal";
import { createHeader } from "./components/Header";
import {
  createRestaurantCardList,
  RestaurantCardList,
} from "./components/restaurant/RestaurantCardList";
import { createRestaurantCard } from "./components/restaurant/RestaurantCard";
import {
  createRestaurantAddForm,
  RestaurantAddForm,
} from "./components/modal/form";
import { createInputBox } from "./components/modal/form/InputBox";

class App {
  #restaurants;

  #showState: {
    filter: CategoryOption;
    sort: SortOption;
    like: boolean;
  };

  constructor() {
    const restaurants = JSON.parse(localStorage.getItem("restaurants") ?? "[]");

    this.#showState = {
      filter: "전체",
      sort: "name",
      like: false,
    };
    this.#restaurants = new Restaurants(restaurants);

    this.init();
  }

  init() {
    createSelect();
    createInputBox();
    createRestaurantAddForm();
    createModal();
    createHeader();
    createRestaurantCard();
    createRestaurantCardList();

    this.renderContainer();
    this.renderRestaurantList();
    this.bindEvents();
  }

  bindEvents() {
    document
      .querySelector<Select>("#category-filter")
      ?.bindEvent(this.onClickFilteringOption.bind(this));

    document
      .querySelector<Select>("#sorting-filter")
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
        this.#restaurants.getListByOption({
          filter: "전체",
          sort: "name",
          like: false,
        })
      )
    );

    this.renderRestaurantList();

    document.querySelector<Modal>(".modal")?.closeModal();
  }
}

export default App;
