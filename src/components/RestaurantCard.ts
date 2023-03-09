import "./RestaurantCard.style.css";

import type { Restaurant } from "../types/restaurant";

import categoryImages from "../constants/categoryImage";
import ModalRoot from "./modal/ModalRoot";
import restaurantState from "../states/restaurants";
import RestaurantDetailModal from "./modal/RestaurantDetailModal";

class RestaurantCard extends HTMLLIElement {
  #name: string | null;

  constructor() {
    super();

    this.#name = this.getAttribute("name");
  }

  connectedCallback() {
    this.render();
    this.bindEvent();
  }

  render() {
    const restaurant = this.getRestaurant();

    if (!restaurant) return;

    this.innerHTML = `
      <button type="button" class="restaurant-detail-button restaurant">
        <div class="restaurant__category">
          <img
            src=${categoryImages[restaurant.category]}
            alt=${restaurant.category}
            class="category-icon"
          />
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body">
            캠퍼스부터 ${restaurant.distance}분 내
          </span>
          <p class="restaurant__description text-body">
            ${restaurant.description ?? ""}
          </p>
        </div>
      </button>
    `;
  }

  bindEvent() {
    this.querySelector(".restaurant-detail-button")?.addEventListener(
      "click",
      this.onClickRestaurantDetail.bind(this)
    );
  }

  onClickRestaurantDetail() {
    if (this.#name === null) return;

    const $modalRoot = document.querySelector<ModalRoot>("modal-root");
    $modalRoot?.open("restaurant-detail-modal");

    const $restaurantDetailModal =
      document.querySelector<RestaurantDetailModal>("restaurant-detail-modal");
    $restaurantDetailModal?.setNameAttribute(this.#name);
  }

  getRestaurant() {
    if (this.#name === null) return;

    return restaurantState.getTargetRestaurant(this.#name);
  }
}

export default RestaurantCard;
