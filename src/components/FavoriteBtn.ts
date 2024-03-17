import Button from './base/Button';

const favoriteImage = './assets/favorite-icon-filled.png';
const linedImage = './assets/favorite-icon-lined.png';

const test = (isFavorite: boolean) => {
  if (isFavorite) {
    return `<img src="${favoriteImage}" alt="${isFavorite}">`;
  }
  return `<img src="${linedImage}" alt="${isFavorite}">`;
};

class FavoriteBtn extends Button {
  #isFavorite: boolean;

  constructor(isFavorite: boolean) {
    super({ content: test(isFavorite) });
    this.element.classList.remove('button');
    this.#isFavorite = isFavorite;

    this.element.addEventListener('click', () => {
      console.log(this.#isFavorite);
    });
  }
}

export default FavoriteBtn;
