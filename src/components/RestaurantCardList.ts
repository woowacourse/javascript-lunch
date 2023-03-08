import type { CategoryOption, SortOption } from "../types/option";
import type { Restaurant } from "../types/restaurant";

import restaurantState from "../states/restaurants";
import RestaurantCard from "./RestaurantCard";

type CardListAttribute = CategoryOption | SortOption | string | null;

class RestaurantCardList extends HTMLUListElement {
  #category: CategoryOption;

  #sorting: SortOption;

  static get observedAttributes() {
    return ["category-filter", "sorting-filter", "data-length"];
  }

  constructor() {
    super();

    this.#category = "전체";
    this.#sorting = "name";
  }

  connectedCallback() {
    this.setListOptionAttributes();
    this.render();
  }

  setListOptionAttributes() {
    this.setAttribute("category-filter", this.#category);
    this.setAttribute("sorting-filter", this.#sorting);
    this.setAttribute("data-length", restaurantState.length());
  }

  render() {
    const restaurants = this.getListByOption(restaurantState.getList());

    this.innerHTML = `${restaurants
      .map(
        (restaurant) =>
          `<li is="restaurant-card" class="restaurant" data-restaurant-name=${restaurant.name}></li>`
      )
      .join("")}`;

    this.childNodes.forEach((restaurantCard, key) => {
      if (restaurantCard instanceof RestaurantCard)
        restaurantCard.render(restaurants[key]);
    });
  }

  attributeChangedCallback(
    attName: string,
    oldValue: CardListAttribute,
    newValue: CardListAttribute
  ) {
    if (oldValue === null) return;
    if (oldValue === newValue) return;

    if (this.isCategoryFilterAttribute(attName, newValue)) {
      this.#category = newValue;
    }

    if (this.isSortingFilterAttribute(attName, newValue)) {
      this.#sorting = newValue;
    }

    this.render();
  }

  isCategoryFilterAttribute(
    attName: string,
    newValue: CardListAttribute
  ): newValue is CategoryOption {
    return attName === "category-filter";
  }

  isSortingFilterAttribute(
    attName: string,
    newValue: CardListAttribute
  ): newValue is SortOption {
    return attName === "sorting-filter";
  }

  getListByOption(restaurants: Restaurant[]) {
    const filteredList = this.filterByCategory(restaurants);
    const sortedList = this.sortBySortOption(filteredList);

    return sortedList;
  }

  sortBySortOption(restaurants: Restaurant[]) {
    return [...restaurants].sort((first, second) =>
      first[this.#sorting] > second[this.#sorting] ? 1 : -1
    );
  }

  filterByCategory(restaurants: Restaurant[]) {
    if (this.#category === "전체") return restaurants;

    return restaurants.filter(
      (restaurant) => restaurant.category === this.#category
    );
  }
}

export default RestaurantCardList;
