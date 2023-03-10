import "./FavoriteButton.style.css";

import favoriteFilledImage from "../images/favorite-icon-filled.png";
import favoriteLinedImage from "../images/favorite-icon-lined.png";
import restaurantState from "../states/restaurants";

class FavoriteButton extends HTMLButtonElement {
  #isFavorite: Boolean;

  constructor() {
    super();

    this.#isFavorite =
      restaurantState.getTargetRestaurant(this.value)?.isFavorite || false;
  }

  connectedCallback() {
    this.setAttribute("class", "favorite-button");
    this.render();
    this.bindEvent();
  }

  render() {
    this.innerHTML = `
      <img
        src=${this.#isFavorite ? favoriteFilledImage : favoriteLinedImage}
        alt="즐겨찾기 버튼"
        class="favorite-icon"
      />
    `;
  }

  bindEvent() {
    this.addEventListener("click", this.onClick.bind(this));
  }

  onClick(event: Event) {
    if (!(event.currentTarget instanceof HTMLButtonElement)) return;

    this.#isFavorite = !this.#isFavorite;
    restaurantState.toggleTargetRestaurantFavorite(this.value);
    this.render();
  }
}

export default FavoriteButton;
