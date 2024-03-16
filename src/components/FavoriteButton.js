import ICON from '../icons';
import { $ } from '../utils/dom';
import generateFavoriteButton from './template/generateFavoriteButton';

class FavoriteButton {
  #element;
  #isFavorite;
  #name;

  constructor({ targetId, name, isFavorite }) {
    this.#element = $(targetId);
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
