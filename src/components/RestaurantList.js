import { navigateToRestaurant, sortByType } from "../domains/Restaurants";
import BaseComponent from "./common/BaseComponent.js";

class RestaurantList extends BaseComponent {
  #currentCategory;
  #navigateBar;

  constructor() {
    super();
    this.#currentCategory = "전체";
  }

  #getCurrentList(sortOption) {
    return sortByType(this.#currentCategory, sortOption, this.#navigateBar);
  }

  #sortRestaurantList(sortOption) {
    this.render(sortOption);
  }

  #filterRestaurantList(option) {
    this.#currentCategory = option;
    this.render();
  }

  render(sortOption) {
    const currentList = this.#getCurrentList(sortOption);

    this.innerHTML = `
    <section class="restaurant-list-container">
        <ul class="restaurant-list">
        ${currentList.reduce((accRestaurants, currRestaurant) => {
          const { name, category, distance, description, isFavorite } =
            currRestaurant;

          return (
            accRestaurants +
            `
            <restaurant-item
              name = "${name}"
              category = "${category}"
              distance = "${distance}"
              description = "${description}"
              isFavorite = "${isFavorite}"
            >
            </restaurant-item>
            `
          );
        }, "")}
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

    document.addEventListener("delete-restaurant", () => {
      this.render();
    });

    document.addEventListener("favorite-click", () => {
      this.render();
    });

    document.addEventListener("favorite-restaurants", () => {
      this.#navigateBar = true;
      this.render();
    });
    document.addEventListener("all-restaurants", () => {
      this.#navigateBar = false;
      this.render();
    });
  }
}

customElements.define("restaurant-list", RestaurantList);
