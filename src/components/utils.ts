import { getFavoriteIcon } from '../constants/images';

function changeRestaurantFavoriteIcon(element: HTMLImageElement) {
  if (element.classList.contains('favorite')) {
    element.classList.remove('favorite');
    element.src = getFavoriteIcon(false);
  } else {
    element.classList.add('favorite');
    element.src = getFavoriteIcon(true);
  }
}

export { changeRestaurantFavoriteIcon };
