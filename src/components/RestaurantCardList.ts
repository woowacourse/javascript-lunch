import restaurantState from "../states/restaurant";
import { CategoryOption, SortOption } from "../types/option";
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
    this.setAttribute(
      "data-length",
      restaurantState.getState().length.toString()
    );
  }

  render() {
    this.innerHTML = `${restaurantState
      .getState()
      .map(
        (restaurant) =>
          `<li is="restaurant-card" class="restaurant" data-restaurant-name=${restaurant.name}></li>`
      )
      .join("")}`;

    this.childNodes.forEach((restaurantCard, key) => {
      if (restaurantCard instanceof RestaurantCard)
        restaurantCard.render(restaurantState.getState()[key]);
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

    restaurantState.setState(this.#category, this.#sorting);
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
}

export default RestaurantCardList;
