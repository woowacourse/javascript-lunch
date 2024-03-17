import restaurantStore from '../../store/RestaurantStore';
import Button from './Button';

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

  constructor(restaurantName: string, isFavorite: boolean) {
    super({ content: test(isFavorite) });
    this.element.classList.remove('button');
    this.element.classList.add('fav-button');
    this.#isFavorite = isFavorite;

    this.element.addEventListener('click', () => {
      restaurantStore.updateFavoriteRestaurant(restaurantName, isFavorite);
    });
  }
}

export default FavoriteBtn;
