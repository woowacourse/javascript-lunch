import { imgSrc } from '../../constants/image';
import store from '../../store';
import { Category, Distance } from '../../types';
import RestaurantItems from '../RestaurantItems';
import $template from './index.html';

class DetailModal extends HTMLElement {
  connectedCallback() {
    this.render();

    const $removeButton = this.querySelector<HTMLButtonElement>('#remove-button')!;
    const $closeButton = this.querySelector<HTMLButtonElement>('#close-button')!;
    const $favoriteIcon = this.querySelector<HTMLElement>('favorite-icon')!;

    // 삭제하기
    $removeButton.addEventListener('click', () => {
      store.removeRestaurant(this.getAttribute('id')!);
      this.remove();
    });

    // 닫기
    $closeButton.addEventListener('click', () => {
      const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
        typeof RestaurantItems
      >;
      $restaurantItems.render(store.restaurants);
      this.remove();
    });

    // 즐겨찾기 추가
    $favoriteIcon.addEventListener('click', (e: MouseEvent) => {
      if (e.target instanceof HTMLImageElement) {
        store.toggleFavoriteRestaurant(this.getAttribute('id')!);
        this.querySelector('favorite-icon')!.toggleAttribute('isfavorite');
      }
    });
  }

  render() {
    this.innerHTML = $template
      .replaceAll('{id}', this.getAttribute('id')!)
      .replaceAll('{src}', imgSrc[this.getAttribute('category') as Category])
      .replaceAll('{category}', this.getAttribute('category')!)
      .replaceAll('{name}', this.getAttribute('name')!)
      .replaceAll('{distance}', this.getAttribute('distance')!)
      .replaceAll('{description}', this.getAttribute('description')!)
      .replaceAll('{link}', this.getAttribute('link')!)
      .replace(
        '{isfavorite}',
        store.restaurants[this.getAttribute('id')!].isFavorite ? 'isfavorite' : '',
      );
  }
}

export default DetailModal;
