import $template from './index.html';
import { Restaurant } from '../../types';
import { $ } from '../../utils/dom';

class RestaurantItems extends HTMLElement {
  connectedCallback() {
    this.innerHTML = $template;
  }

  render(restaurants: Restaurant[]) {
    this.innerHTML = $template;
    const $restaurantList = $<HTMLElement>('.restaurant-list', this);

    restaurants.forEach((restaurant) => {
      $restaurantList.insertAdjacentHTML('beforeend', this.createRestaurantItem(restaurant));
    });
  }

  createRestaurantItem(restaurant: Restaurant) {
    const { category, name, distance, description, link, favorite, id } = restaurant;
    return `<restaurant-item category=${category} name=${name} distance=${distance} description=${description} favorite=${favorite} id=${id} link=${link} ></restaurant-item>`;
  }

  addBottomSheetHandler(handler: CallableFunction) {
    this.addEventListener('click', (e: any) => {
      if (e.target.className === 'favorite-icon') return;
      const target = e.target.closest('restaurant-item');
      const restaurant = [
        'category',
        'name',
        'distance',
        'description',
        'link',
        'favorite',
        'id',
      ].reduce((acc, cur) => {
        acc[cur] = target.getAttribute(cur);
        return acc;
      }, {} as Record<string, string>);
      handler(restaurant);
    });
  }

  addFavoriteButtonHandler(handler: CallableFunction) {
    this.addEventListener('click', (e: any) => {
      if (e.target.className !== 'favorite-icon') return;
      const id = e.target.closest('restaurant-item').getAttribute('id');
      handler(id);
    });
  }
}

export default RestaurantItems;
