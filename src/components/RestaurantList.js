import { filterByCategory, sortByType } from "../domains/Restaurants";
import BaseComponent from "./BaseComponent.js";

class RestaurantList extends BaseComponent {
  #currentCategory;

  constructor() {
    super();
    this.#currentCategory = "전체";
  }

  #getCurrentList(sortOption) {
    return sortOption
      ? sortByType(this.#currentCategory, sortOption)
      : filterByCategory(this.#currentCategory);
  }

  #sortRestaurantList(sortOption) {
    this.render(sortOption);
  }

  #filterRestaurantList(option) {
    this.#currentCategory = option;
    this.render();
  }

  #createRestaurantListHTML(restaurantList) {
    return restaurantList.reduce((accRestaurants, currentRestaurant) => {
      const { name, category, distance, description } = currentRestaurant;

      return (
        accRestaurants +
        `
        <restaurant-item
          name="${name}"
          category="${category}"
          distance="${distance}"
          description="${description}"
        ></restaurant-item>
        `
      );
    }, "");
  }

  render(sortOption) {
    const currentList = this.#getCurrentList(sortOption);

    this.innerHTML = `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
        ${this.#createRestaurantListHTML(currentList)}
        </ul>
      </section>
      
    `;
  }

  setEvent() {
    document.addEventListener("select-change", (event) => {
      const { type, option } = event.detail;

      type === "sort"
        ? this.#sortRestaurantList(option)
        : this.#filterRestaurantList(option);
    });

    document.addEventListener("add-restaurant", () => {
      this.render();
    });
  }
}

customElements.define("restaurant-list", RestaurantList);
