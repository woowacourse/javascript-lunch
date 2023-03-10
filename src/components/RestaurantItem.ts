import images from '../img/images';
import { Restaurant } from '../types/restaurantTypes';

export default class RestaurantItem {
  $target: HTMLElement;
  restaurant: Restaurant;

  constructor($target: HTMLElement, restaurant: Restaurant) {
    this.$target = $target;
    this.restaurant = restaurant;
    this.render();
  }

  render(): void {
    const { name, category, distance, description, isLike } = this.restaurant;
    const $restaurantItem = document.createElement('li');
    $restaurantItem.classList.add('restaurant');
    $restaurantItem.innerHTML = `
      <div class="restaurant__category">
        <img src="${images[category]}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <div class="favorite-icon-container">
        ${
          isLike
            ? `<img src="${images['색칠별']}" alt="${'색첼아이콘'}" class="favorite-icon"`
            : `<img src="${images['빈별']}" alt="${'빈아이콘'}" class="favorite-icon"`
        }
        </div>
        <p class="restaurant__description text-body">${description}</p>
      </div>
    `;

    $restaurantItem.addEventListener('click', () => {
      const $modalContainer = document.querySelector('.modal-container') as HTMLElement;
      console.log('MODAL OPEN');
    });

    this.$target.appendChild($restaurantItem);
  }
}
