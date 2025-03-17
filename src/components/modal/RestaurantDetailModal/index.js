import { MESSAGES } from "../../../constants/rules.js";
import Modal from "../common/Modal.js";
import RestaurantContent from "./RestaurantContent.js";

class RestaurantDetailModal extends Modal {
  #restaurant;
  #onToggleFavorite;
  #onDeleteRestaurant;

  constructor($target, { restaurant, onToggleFavorite, onDeleteRestaurant }) {
    super($target);
    this.#restaurant = restaurant;
    this.#onToggleFavorite = onToggleFavorite;
    this.#onDeleteRestaurant = onDeleteRestaurant;
  }

  contents() {
    const imageSource = {
      한식: "category-korean.png",
      중식: "category-chinese.png",
      일식: "category-japanese.png",
      양식: "category-western.png",
      아시안: "category-asian.png",
      기타: "category-etc.png",
    };

    return /*html */ `
      <div class="space-between">
        <div class="restaurant__category">
          <img src="./icons/${imageSource[this.#restaurant.category]}" alt="${
      this.#restaurant.category
    }" class="category-icon" />
        </div>
        <img src="${
          this.#restaurant.isFavorite
            ? "./icons/favorite-icon-filled.png"
            : "./icons/favorite-icon-lined.png"
        }" alt="${
      this.#restaurant.isFavorite ? "favorite" : "not-favorite"
    }" class="favorite-icon" data-testid="favorite-button" />
      </div>
      ${RestaurantContent({ restaurant: this.#restaurant })}
      <div class="button-container">
        <button type="button" id="delete-restaurant" class="button button--secondary text-caption" data-testid="delete-restaurant">삭제하기</button>
        <button id="close-modal" class="button button--primary text-caption" data-testid="close-modal">닫기</button>
      </div>
    `;
  }

  open() {
    super.open();
    if (this.getIsOpen()) {
      this.#addEventListeners();
    }
  }

  close() {
    this.#removeEventListeners();
    super.close();
  }

  #addEventListeners() {
    const $deleteButton = this.getTarget().querySelector("#delete-restaurant");
    const $closeButton = this.getTarget().querySelector("#close-modal");
    const $favoriteIcon = this.getTarget().querySelector(".favorite-icon");

    $deleteButton.addEventListener("click", this.#handleDelete);
    $closeButton.addEventListener("click", this.handleClose);
    $favoriteIcon.addEventListener("click", this.#handleFavoriteToggle);
  }

  #removeEventListeners() {
    const $deleteButton = this.getTarget().querySelector("#delete-restaurant");
    const $closeButton = this.getTarget().querySelector("#close-modal");
    const $favoriteIcon = this.getTarget().querySelector(".favorite-icon");

    $deleteButton.removeEventListener("click", this.#handleDelete);
    $closeButton.removeEventListener("click", this.handleClose);
    $favoriteIcon.removeEventListener("click", this.#handleFavoriteToggle);
  }

  #handleDelete = () => {
    try {
      if (!confirm(MESSAGES.DELETE_MESSAGE)) return;

      if (this.#onDeleteRestaurant) {
        this.#onDeleteRestaurant(this.#restaurant.id);
      }

      this.close();
    } catch (error) {
      alert(error.message);
    }
  };

  #handleFavoriteToggle = () => {
    if (this.#onToggleFavorite) {
      this.#onToggleFavorite(this.#restaurant.id);
    }

    this.#restaurant.isFavorite = !this.#restaurant.isFavorite;

    const $favoriteIcon = this.getTarget().querySelector(".favorite-icon");
    $favoriteIcon.src = this.#restaurant.isFavorite
      ? "./icons/favorite-icon-filled.png"
      : "./icons/favorite-icon-lined.png";
    $favoriteIcon.alt = this.#restaurant.isFavorite
      ? "favorite"
      : "not-favorite";
  };
}

export default RestaurantDetailModal;
