import BaseComponent from '../BaseComponent';
import fillStar from '@/assets/favorite-icon-filled.png';
import noFillStar from '@/assets/favorite-icon-lined.png';

class FavoriteButton extends BaseComponent {
  #isFavorite: boolean;
  #button: HTMLButtonElement;

  constructor(isFavorite: boolean) {
    super();
    this.#isFavorite = isFavorite;
    this.#button = document.createElement('button');
  }

  render() {
    this.#button.classList.add('favorite-button');
    const $imgBox = document.createElement('img');
    this.#button.append($imgBox);

    const starImg = this.#isFavorite ? fillStar : noFillStar;
    $imgBox.setAttribute('src', starImg);
    this.replaceWith(this.#button);
  }

  setEvent(): void {
    this.#button.addEventListener('click', () => {});
  }
}

export default FavoriteButton;

customElements.define('favorite-button', FavoriteButton);
