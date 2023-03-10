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
    this.onClick = this.onClick.bind(this);
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
    this.addEventListener("click", this.onClick);
  }

  removeEvent() {
    this.removeEventListener("click", this.onClick);
  }

  onClick() {
    restaurantState.toggleTargetRestaurantFavorite(this.value);
    this.toggleIsFavorite();
  }

  toggleIsFavorite() {
    this.#isFavorite = !this.#isFavorite;
    this.render();
  }
}

export default FavoriteButton;
