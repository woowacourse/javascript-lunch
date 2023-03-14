import type { Restaurant } from "./types/restaurant";
import type { CategoryOption, SortOption } from "./types/option";

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
import {
  createModalDetailContent,
  DetailModal,
} from "./components/modal/detail";
import { createDetailInfo, Info } from "./components/modal/detail/info";

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
    createModalDetailContent();
    createDetailInfo();

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

    document
      .querySelector<DetailModal>(".modal-detail")
      ?.bindEvent(
        this.onClickRestaurantRemove.bind(this),
        this.onClickDetailLikeButton.bind(this)
      );

    document
      .querySelector<RestaurantCardList>(".restaurant-list")
      ?.bindEvent(
        this.onClickRestaurantLikeButton.bind(this),
        this.onClickRestaurantCard.bind(this)
      );

    document
      .querySelector<HTMLElement>(".like-filter-container")
      ?.addEventListener("click", (event: MouseEvent) => {
        const likeState = JSON.parse(
          `${(event.target as HTMLElement).getAttribute("like")}`
        );

        this.#showState = { ...this.#showState, like: likeState };

        this.toggleLikeButtonStyle();
        this.renderRestaurantList();
      });
  }

  renderContainer() {
    document.body.innerHTML = `
      <header is="custom-header" class="gnb"></header>
      <main>
        <section class="like-filter-container">
          <div id="all-like-button" class="like-filter-button like-filter-button--activated" like="false">모든 음식점</div>
          <div id="like-button" class="like-filter-button" like="true">자주 가는 음식점</div>
        </section>
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

  onClickRestaurantCard(restaurantId: string) {
    const restaurantInfo = this.#restaurants.getRestaurantById(restaurantId);

    if (restaurantInfo)
      document.querySelector<Modal>(".modal")?.openDetailModal(restaurantInfo);
  }

  onClickRestaurantLikeButton(restaurantId: string) {
    this.#restaurants.toggleLike(restaurantId);

    localStorage.setItem(
      "restaurants",
      JSON.stringify(this.#restaurants.getList())
    );

    this.renderRestaurantList();
  }

  onClickDetailLikeButton(restaurantId: string) {
    this.onClickRestaurantLikeButton(restaurantId);

    const restaurantInfo = this.#restaurants.getRestaurantById(restaurantId);

    if (restaurantInfo)
      document
        .querySelector<Info>(".restaurant-detail-container")
        ?.renderContent(restaurantInfo);
  }

  onClickRestaurantRemove(restaurantId: string) {
    this.#restaurants.removeById(restaurantId);

    localStorage.setItem(
      "restaurants",
      JSON.stringify(this.#restaurants.getList())
    );

    this.renderRestaurantList();
    document.querySelector<Modal>(".modal")?.closeModal();
  }

  toggleLikeButtonStyle() {
    const likeState = this.#showState.like;
    const allLikeButton = document.querySelector("#all-like-button");
    const likeButton = document.querySelector("#like-button");

    if (likeState) {
      allLikeButton?.classList.remove("like-filter-button--activated");
      likeButton?.classList.add("like-filter-button--activated");
      return;
    }
    allLikeButton?.classList.add("like-filter-button--activated");
    likeButton?.classList.remove("like-filter-button--activated");
  }

  addNewRestaurant(restaurant: Restaurant) {
    this.#restaurants.add(restaurant);

    localStorage.setItem(
      "restaurants",
      JSON.stringify(this.#restaurants.getList())
    );

    this.renderRestaurantList();

    document.querySelector<Modal>(".modal")?.closeModal();
  }
}

export default App;
