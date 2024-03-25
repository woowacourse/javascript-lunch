import restaurantStore from '../../store/RestaurantStore';
import Button from './Button';

const favoriteImage = './assets/favorite-icon-filled.png';
const linedImage = './assets/favorite-icon-lined.png';

const conditionRender = (isFavorite: boolean) => {
  if (isFavorite) {
    return `<img src="${favoriteImage}" alt="${isFavorite}">`;
  }
  return `<img src="${linedImage}" alt="${isFavorite}">`;
};

class FavoriteBtn extends Button {
  constructor(restaurantName: string, isFavorite: boolean) {
    super({ content: conditionRender(isFavorite) });
    this.element.classList.remove('button');
    this.element.classList.add('fav-button');

    this.element.addEventListener('click', () => {
      restaurantStore.updateFavoriteRestaurant(restaurantName, isFavorite);
    });
  }
}

export default FavoriteBtn;
