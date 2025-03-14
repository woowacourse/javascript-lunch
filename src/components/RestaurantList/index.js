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
    const $ul = $element.querySelector("#restaurant-list");
    $ul.addEventListener("click", (event) => {
      this.#handleFavoriteClick(event);
      this.#handleRestaurantClick(event);
    });
  }

  #handleFavoriteClick(event) {
    const $target = event.target;
    if (!$target.classList.contains("favorite-icon")) return;

    const $li = $target.closest(".restaurant");
    if (!$li) return;

    const id = $li.dataset.id;
    if (this.#onToggleFavorite) {
      this.#onToggleFavorite(id);
    }
    if (this.#updateList) {
      this.#updateList();
    }
  }

  #handleRestaurantClick(event) {
    const $target = event.target;
    if ($target.classList.contains("favorite-icon")) return;

    const $li = $target.closest(".restaurant");
    if (!$li) return;

    const $detailModal = new RestaurantDetailModal(
      document.querySelector("#modal"),
      {
        restaurant: this.#restaurants.find(
          (restaurant) => restaurant.id === $li.dataset.id
        ),
        onToggleFavorite: this.#onToggleFavorite,
        onDeleteRestaurant: this.#onDeleteRestaurant,
      }
    );
    $detailModal.open();
  }

  render() {
    const $element = this.#createTemplateElement();
    this.#addEventListeners($element);
    return $element;
  }
}

export default RestaurantList;
