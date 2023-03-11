import { imgSrc } from '../../constants/image';
import store from '../../store';
import { Category, Restaurant } from '../../types';
import FavoriteIcon from '../Icon/FavoriteIcon';
import $template from './index.html';

interface Props {
  restaurant: Restaurant;
  onRestaurantItemClick: (restaurantId: string) => void;
  onFavoriteButtonClick: (restaurantId: string) => void;
}

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
  }

  setProps({ restaurant, onRestaurantItemClick, onFavoriteButtonClick }: Props) {
    this.render(restaurant);
    this.setHandleRestaurantItemClick({ onRestaurantItemClick });
    this.setHandleFavoriteButtonClick({ onFavoriteButtonClick });
  }

  render({ category, name, distance, isFavorite, description, link }: Restaurant) {
    this.innerHTML = $template
      .replace('{src}', imgSrc[category])
      .replace('{category}', category)
      .replace('{name}', name)
      .replace('{distance}', distance + '')
      .replace('{description}', description || '')
      .replace('{isfavorite}', isFavorite ? 'isfavorite' : '');
  }

  private setHandleRestaurantItemClick({
    onRestaurantItemClick,
  }: Pick<Props, 'onRestaurantItemClick'>) {
    // detail-modal 열기
    this.addEventListener('click', (e) => {
      if (e.target instanceof HTMLImageElement) return;
      onRestaurantItemClick(this.getAttribute('id')!);
    });
  }

  private setHandleFavoriteButtonClick({
    onFavoriteButtonClick,
  }: Pick<Props, 'onFavoriteButtonClick'>) {
    // 즐겨찾기 추가
    this.addEventListener('click', (e: MouseEvent) => {
      if (e.target instanceof HTMLImageElement) {
        onFavoriteButtonClick(e.target.closest('restaurant-item')?.id!);
        this.querySelector('favorite-icon')!.toggleAttribute('isfavorite');
      }
    });
  }
}

export default RestaurantItem;
