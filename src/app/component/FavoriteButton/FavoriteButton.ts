import './FavoriteButton.css';

export default class FavoriteButton {
  private button: HTMLButtonElement;

  constructor(isFavorited: boolean) {
    this.button = document.createElement('button');
    this.button.classList.add('restaurant__favorite-button');
    this.setFavorited(isFavorited);
  }

  setFavorited(isFavorited: boolean) {
    this.button.classList.toggle('favorited', isFavorited);
  }

  render() {
    return this.button;
  }
}
