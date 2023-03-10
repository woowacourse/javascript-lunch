import FavoriteIcon from '../\bIcon/FavoriteIcon';
import { imgSrc } from '../../constants/image';
import store from '../../store';
import { Category } from '../../types';
import $template from './index.html';

class RestaurantItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();

    // detail-modal 열기
    this.addEventListener('click', (e) => {
      if (e.target instanceof HTMLImageElement) return;
      const $detailModal = document.createElement('detail-modal');

      $detailModal?.setAttribute('id', this.getAttribute('id')!);
      $detailModal?.setAttribute('src', imgSrc[this.getAttribute('category') as Category]);
      $detailModal?.setAttribute('category', this.getAttribute('category')!);
      $detailModal?.setAttribute('name', this.getAttribute('name')!);
      $detailModal?.setAttribute('distance', this.getAttribute('distance')!);
      $detailModal?.setAttribute('description', this.getAttribute('description')!);
      $detailModal?.setAttribute('link', this.getAttribute('link')!);
      document.body.insertAdjacentElement('beforeend', $detailModal);
    });

    // 즐겨찾기 추가
    this.addEventListener('click', (e: MouseEvent) => {
      if (e.target instanceof HTMLImageElement) {
        store.toggleFavoriteRestaurant(e.target.closest('restaurant-item')?.id!);

        this.querySelector('favorite-icon')!.toggleAttribute('isfavorite');
      }
    });
  }

  render() {
    this.innerHTML = $template
      .replace('{src}', imgSrc[this.getAttribute('category') as Category])
      .replace('{category}', this.getAttribute('category')!)
      .replace('{name}', this.getAttribute('name')!)
      .replace('{distance}', this.getAttribute('distance')!)
      .replace('{description}', this.getAttribute('description')!)
      .replace(
        '{isfavorite}',
        store.restaurants[this.getAttribute('id')!].isFavorite ? 'isfavorite' : '',
      );
  }
}

export default RestaurantItem;
