import BaseComponent from '../BaseComponent';
import fillStar from '@/assets/favorite-icon-filled.png';
import noFillStar from '@/assets/favorite-icon-lined.png';

class FavoriteButton extends BaseComponent {
  #isFavorite: boolean;

  constructor(isFavorite: boolean) {
    super();
    this.#isFavorite = isFavorite;
  }

  render() {
    const $button = document.createElement('button');
    $button.classList.add('favorite-button');
    const $imgBox = document.createElement('img');
    $button.append($imgBox);

    const starImg = this.#isFavorite ? fillStar : noFillStar;
    $imgBox.setAttribute('src', starImg);
    this.outerHTML = $button.outerHTML;
  }
}

export default FavoriteButton;

customElements.define('favorite-button', FavoriteButton);
