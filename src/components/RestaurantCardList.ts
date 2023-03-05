import restaurantState from "../states/restaurant";
import { CategoryOption, SortOption } from "../types/option";
import RestaurantCard from "./RestaurantCard";

class RestaurantCardList extends HTMLUListElement {
  #category: CategoryOption;

  #sorting: SortOption;

  static get observedAttributes() {
    return ["data-category", "data-sorting", "data-length"];
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
    this.setAttribute("data-category", this.#category);
    this.setAttribute("data-sorting", this.#sorting);
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

    if (attName === "data-category") {
      this.#category = newValue as any;
    }

    if (attName === "data-sorting") {
      this.#sorting = newValue as any;
    }

    restaurantState.setState(this.#category, this.#sorting);
    this.render();
  }
}

export default RestaurantCardList;
