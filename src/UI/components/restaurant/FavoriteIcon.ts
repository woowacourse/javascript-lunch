import { FAVORITE_IMAGE_SRC } from '../../../../public/assets/imagePaths';

class FavoriteIcon {
  private element: HTMLDivElement;
  private isFavorite: boolean;
  private imgElement: HTMLImageElement;

  constructor(isFavorite: boolean) {
    this.isFavorite = isFavorite;
    this.element = this.#createFavoriteIcon();
    this.imgElement = this.element.querySelector('img') as HTMLImageElement;
    this.#addEventListeners();
  }

  #createFavoriteIcon(): HTMLDivElement {
    const favoriteIcon = document.createElement('div');
    favoriteIcon.classList.add('favorite-icon');

    const img = document.createElement('img');
    img.classList.add('favorite-img');
    img.src = this.isFavorite ? FAVORITE_IMAGE_SRC.FAVORITE : FAVORITE_IMAGE_SRC.UNFAVORITE;
    img.alt = this.isFavorite ? '즐겨찾기' : '즐겨찾기 아님';

    favoriteIcon.appendChild(img);
    return favoriteIcon;
  }

  #addEventListeners(): void {
    this.element.addEventListener('click', this.#handleFavoriteClick.bind(this));
  }

  #handleFavoriteClick(): void {
    this.isFavorite = !this.isFavorite;
    this.#updateFavoriteIcon();
  }

  #updateFavoriteIcon(): void {
    this.imgElement.src = this.isFavorite ? FAVORITE_IMAGE_SRC.FAVORITE : FAVORITE_IMAGE_SRC.UNFAVORITE;
    this.imgElement.alt = this.isFavorite ? '즐겨찾기' : '즐겨찾기 아님';
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export default FavoriteIcon;
