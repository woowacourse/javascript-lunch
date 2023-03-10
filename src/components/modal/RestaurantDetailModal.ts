import "./RestaurantDetailModal.style.css";

import ModalContent from "./ModalContent";
import restaurantState from "../../states/restaurants";
import categoryImages from "../../constants/categoryImage";
import RestaurantCardList from "../RestaurantCardList";
import FavoriteButton from "../FavoriteButton";

class RestaurantDetailModal extends ModalContent {
  #name: string | null;

  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();

    this.#name = this.getAttribute("name");
  }

  render() {
    if (this.#name === null) return;

    const restaurant = restaurantState.getTargetRestaurant(this.#name);

    if (!restaurant) return;

    this.innerHTML = `
      <div class="restaurant-detail-favorite">
        <button is="favorite-button" type="button" value=${this.#name}></button>
      </div>
      <div class="restaurant__category restaurant-detail-category">
        <img
          src=${categoryImages[restaurant.category]}
          alt=${restaurant.category}
          class="category-icon"
        />
      </div>
      <div class="restaurant-detail-info">
        <h2 class="restaurant-detail-name text-title">${restaurant.name}</h2>
        <span class="restaurant-detail-distance text-body">
          캠퍼스부터 ${restaurant.distance}분 내
        </span>
        <p class="restaurant-detail-description text-body">
          ${restaurant.description ?? ""}
        </p>
        ${
          restaurant.link
            ? `<a href=${restaurant.link} class="restaurant-detail-link" target="_blank">${restaurant.link}</a>`
            : ""
        }
      </div>
      <div class="button-container">
        <button
          type="button"
          id="delete-button"
          class="button button--secondary text-caption"
        >
          삭제하기
        </button>
        <button
          type="button"
          id="close-button"
          class="button button--primary text-caption">
          닫기
        </button>
      </div>
    `;
  }

  bindEvent() {
    if (!this.hasChildNodes()) return;

    this.querySelector<HTMLButtonElement>("#delete-button")?.addEventListener(
      "click",
      this.onClickDeleteButton.bind(this)
    );

    this.querySelector<HTMLButtonElement>("#close-button")?.addEventListener(
      "click",
      this.onClickCloseButton.bind(this)
    );

    this.querySelector<FavoriteButton>(
      ".restaurant-detail-favorite button"
    )?.bindEvent(this.onClickFavoriteButton.bind(this));
  }

  onClickDeleteButton() {
    if (this.#name === null) return;

    restaurantState.deleteTargetRestaurant(this.#name);

    const $restaurantCardList =
      document.querySelector<RestaurantCardList>(".restaurant-list");
    $restaurantCardList?.setAttribute("data-length", restaurantState.length());

    if (!this.closeModal) return;

    this.closeModal();
  }

  onClickCloseButton() {
    if (!this.closeModal) return;

    this.closeModal();
  }

  onClickFavoriteButton() {
    const $restaurantCardFavorite = document.querySelector<FavoriteButton>(
      `.favorite__button button[value=${this.#name}]`
    );
    $restaurantCardFavorite?.toggleIsFavorite();
  }

  attributeChangedCallback(
    attName: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue === newValue) return;
    if (attName !== "name") return;

    this.#name = newValue;
    this.render();
    this.bindEvent();
  }

  setNameAttribute(name: string) {
    this.setAttribute("name", name);
  }
}

export default RestaurantDetailModal;
