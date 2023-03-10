import "./RestaurantCard.style.css";

import ModalRoot from "./modal/ModalRoot";
import RestaurantDetailModal from "./modal/RestaurantDetailModal";
import categoryImages from "../constants/categoryImage";
import restaurantState from "../states/restaurants";
import FavoriteButton from "./FavoriteButton";
import RestaurantCardList from "./RestaurantCardList";

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
      <div class="favorite__button">
        <button is="favorite-button" type="button" value=${this.#name}></button>
      </div>
    `;
  }

  bindEvent() {
    this.querySelector(".restaurant-detail-button")?.addEventListener(
      "click",
      this.onClickRestaurantDetail.bind(this)
    );

    this.querySelector<FavoriteButton>(".favorite__button button")?.bindEvent(
      this.onClickFavoriteButton.bind(this)
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

  onClickFavoriteButton() {
    const $restaurantCardList =
      document.querySelector<RestaurantCardList>(".restaurant-list");

    if ($restaurantCardList?.dataset.view === "favorite") {
      $restaurantCardList?.setRestaurants("favorite");
      $restaurantCardList?.render();
    }
  }

  getRestaurant() {
    if (this.#name === null) return;

    return restaurantState.getTargetRestaurant(this.#name);
  }
}

export default RestaurantCard;
