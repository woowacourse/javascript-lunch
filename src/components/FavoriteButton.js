import generateFavoriteButton from './template/generateFavoriteButton';
import { convertNameToId } from '../utils/nameConverter';
import ICON from '../icons';

class FavoriteButton {
  #restaurantsInstance;
  #restaurant;

  constructor({ restaurantsInstance, restaurant }) {
    this.#restaurantsInstance = restaurantsInstance;
    this.#restaurant = restaurant;

    this.#initEventListeners();
  }

  render() {
    return generateFavoriteButton(this.#restaurant);
  }

  #initEventListeners() {
    document.addEventListener('click', this.#handleFavoriteIconClick.bind(this));
  }

  #handleFavoriteIconClick(event) {
    const clickedButton = event.target.closest('#favorite-button');

    if (
      clickedButton &&
      (event.target.closest('#restaurant-list') || event.target.closest('#restaurant-detail-modal'))
    ) {
      this.#handleFavoriteIconStatusChange(clickedButton);
    }
  }

  #handleFavoriteIconStatusChange(clickedButton) {
    const clickedRestaurantName = clickedButton.dataset.name;
    this.#restaurantsInstance.updateFavoriteStatus(clickedRestaurantName);

    const restaurant = this.#restaurantsInstance.standardList.find(
      (restaurant) => restaurant.name === clickedRestaurantName,
    );

    this.#changeFavoriteButtonIcon(restaurant);
  }

  #changeFavoriteButtonIcon(restaurant) {
    const iconSrc = restaurant.isFavorite ? ICON.즐겨찾기추가 : ICON.즐겨찾기해제;

    this.#updateIconSrc(
      `#restaurant-list #favorite-icon-${convertNameToId(restaurant.name)}`,
      iconSrc,
    );

    this.#updateIconSrc(
      `#restaurant-detail-modal #favorite-icon-${convertNameToId(restaurant.name)}`,
      iconSrc,
    );
  }

  #updateIconSrc(selector, src) {
    const iconElement = document.querySelector(selector);
    if (iconElement) {
      iconElement.src = src;
    }
  }
}

export default FavoriteButton;
