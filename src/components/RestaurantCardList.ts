import restaurantState from "../states/restaurant";
import { CategoryOption, SortOption } from "../types/option";
import RestaurantCard from "./RestaurantCard";

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
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue === null) return;
    if (oldValue === newValue) return;

    if (attName === "category-filter") {
      this.#category = newValue as any;
    }

    if (attName === "sorting-filter") {
      this.#sorting = newValue as any;
    }

    restaurantState.setState(this.#category, this.#sorting);
    this.render();
  }
}

export default RestaurantCardList;
