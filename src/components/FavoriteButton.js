import generateFavoriteButton from './template/generateFavoriteButton';
import { $ } from '../utils/dom';
import { convertIdToName } from '../utils/nameConverter';
import ICON from '../icons';

class FavoriteButton {
  #element;
  #restaurantsInstance;
  #isFavorite;
  #name;

  constructor({ targetId, restaurantsInstance, name, isFavorite }) {
    this.#element = $(targetId);
    this.#restaurantsInstance = restaurantsInstance;
    this.#isFavorite = isFavorite;
    this.#name = name;

    this.#initEventListeners();
  }

  render() {
    return generateFavoriteButton(this.#name, this.#isFavorite);
  }

  #initEventListeners() {
    this.#element.addEventListener('click', this.#handleFavoriteButtonStatusChange.bind(this));
  }

  #handleFavoriteButtonStatusChange(event) {
    const clickedButton = event.target.closest(`#favorite-button-${this.#name}`);

    if (clickedButton) {
      this.#isFavorite = !this.#isFavorite;
      this.changeFavoriteButtonIcon(clickedButton);
      this.#restaurantsInstance.updateFavoriteStatus(convertIdToName(this.#name), this.#isFavorite);
    }
  }

  changeFavoriteButtonIcon(clickedButton) {
    const iconSrc = this.#isFavorite ? ICON.즐겨찾기추가 : ICON.즐겨찾기해제;
    const iconImg = clickedButton.querySelector('img');

    if (iconImg) {
      iconImg.src = iconSrc;
    }
  }
}

export default FavoriteButton;
