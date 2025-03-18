import RestaurantDetailModal from "../modal/RestaurantDetailModal/index.js";
import RestaurantItem from "./RestaurantItem.js";

class RestaurantList {
  #restaurants;
  #onToggleFavorite;
  #onDeleteRestaurant;
  #updateList;

  constructor(
    restaurants,
    { onToggleFavorite, onDeleteRestaurant, updateList }
  ) {
    this.#restaurants = restaurants;
    this.#onToggleFavorite = onToggleFavorite;
    this.#onDeleteRestaurant = onDeleteRestaurant;
    this.#updateList = updateList;
  }

  #createTemplateElement() {
    const htmlString = /* html */ `
      <section class="restaurant-list-container">
        <ul id="restaurant-list" class="restaurant-list" data-testid="restaurant-list">
          ${this.#restaurants.map(RestaurantItem).join("")}
        </ul>
      </section>
    `;
    const $template = document.createElement("template");
    $template.innerHTML = htmlString.trim();

    return $template.content.firstElementChild;
  }

  #addEventListeners($element) {
    const $lis = $element.querySelectorAll(".restaurant");

    $lis.forEach(($li) => {
      const restaurantId = $li.dataset.id;

      const $favoriteIcon = $li.querySelector(".favorite-icon");
      $favoriteIcon.addEventListener("click", (event) => {
        event.stopPropagation();

        if (this.#onToggleFavorite) {
          this.#onToggleFavorite(restaurantId);
        }
        if (this.#updateList) {
          this.#updateList();
        }
      });

      $li.addEventListener("click", () => {
        const targetRestaurant = this.#restaurants.find(
          (restaurant) => restaurant.id === restaurantId
        );

        const $detailModal = new RestaurantDetailModal(
          document.querySelector("#modal"),
          {
            restaurant: targetRestaurant,
            onToggleFavorite: this.#onToggleFavorite,
            onDeleteRestaurant: this.#onDeleteRestaurant,
          }
        );
        $detailModal.open();
      });
    });
  }

  render() {
    const $element = this.#createTemplateElement();
    this.#addEventListeners($element);
    return $element;
  }
}

export default RestaurantList;
