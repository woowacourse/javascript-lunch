import Restaurants from "../domain/Restaurants";
import { CategoryOption, SortOption } from "../types/option";

class RestaurantCardList extends HTMLUListElement {
  #category: CategoryOption;

  #sorting: SortOption;

  static get observedAttributes() {
    return ["data-category", "data-sorting"];
  }

  constructor() {
    super();

    this.#category = "전체";
    this.#sorting = "name";
  }

  connectedCallback() {
    this.setListOptionAttributes();
  }

  setListOptionAttributes() {
    this.setAttribute("data-category", this.#category);
    this.setAttribute("data-sorting", this.#sorting);
  }

  render(restaurants: Restaurants) {
    this.innerHTML = `
      ${restaurants
        .getListByOption({ filter: this.#category, sort: this.#sorting })
        .map(
          (restaurant) =>
            `<li is="restaurant-card" class="restaurant" data-restaurant=${JSON.stringify(
              restaurant
            )}></li>`
        )
        .join("")}
    `;
  }

  attributeChangedCallback(
    attName: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (attName === "data-category") {
      this.#category = newValue as any;
    }

    if (attName === "data-sorting") {
      this.#sorting = newValue as any;
    }

    console.log("att change!", newValue);
  }
}

export default RestaurantCardList;
