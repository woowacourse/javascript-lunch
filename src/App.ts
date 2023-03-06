import type { Category, Distance } from "./types/restaurant";
import type { CategoryOption, SortOption } from "./types/option";

import createCustomSelect, { CustomSelect } from "./components/Select";
import createCustomModal from "./components/modal/Modal";
import createCustomHeader, { CustomHeader } from "./components/Header";
import {
  createRestaurantCardList,
  RestaruantCardList,
} from "./components/restaurant/RestaurantCardList";
import Restaurants from "./domain/Restaurants";
import { createRestaurantCard } from "./components/restaurant/RestaurantCard";
import { createRestaurantAddForm } from "./components/modal/RestaurantAddForm";

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
      .querySelector<CustomHeader>(".gnb")
      ?.bindEvent(this.openModal.bind(this));
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
        <custom-modal></custom-modal>
      </main>
    `;

    this.renderRestaurantList();
  }

  onClickSortingOption(selectedOption: string) {
    this.#showState.sort = selectedOption as SortOption;
    this.renderRestaurantList();
  }

  onClickFilteringOption(selectedOption: string) {
    this.#showState.filter = selectedOption as CategoryOption;
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
    document
      .querySelector<RestaruantCardList>(".restaurant-list")
      ?.render(this.#restaurants.getListByOption(this.#showState));
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
