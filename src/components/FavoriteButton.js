import generateFavoriteButton from './template/generateFavoriteButton';
import { $ } from '../utils/dom';
import { convertIdToName, convertNameToId } from '../utils/nameConverter';
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
    const clickedButton = event.target.closest(`#favorite-button-${convertNameToId(this.#name)}`);
    if (clickedButton) {
      this.#isFavorite = !this.#isFavorite;
      this.#changeFavoriteButtonIcon();
      this.#restaurantsInstance.updateFavoriteStatus(convertIdToName(this.#name), this.#isFavorite);
    }
  }

  #changeFavoriteButtonIcon() {
    const iconSrc = this.#isFavorite ? ICON.즐겨찾기추가 : ICON.즐겨찾기해제;
    const iconImages = document.querySelectorAll(
      `#favorite-button-${convertNameToId(this.#name)} .favorite-icon`,
    );

    iconImages.forEach((iconImg) => {
      if (iconImg) {
        iconImg.src = iconSrc;
      }
    });
  }
}

export default FavoriteButton;
