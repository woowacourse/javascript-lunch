import { store } from '../../store';
import { Restaurant, Restaurants } from '../../types';
import $template from './index.html';

class RestaurantItems extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render(store.restaurants);
  }

  render(restaurants: Restaurants) {
    this.innerHTML = $template;
    const $restaurantList = this.querySelector('.restaurant-list') as HTMLUListElement;

    Object.entries(restaurants).forEach(([id, restaurant]) => {
      const { category, name, distance, description, link } = restaurant;

      $restaurantList.insertAdjacentHTML(
        'beforeend',
        `<restaurant-item id=${id} category=${category} name=${name} distance=${distance} description=${description} link=${link}></restaurant-item>`,
      );
    });
  }
}

export default RestaurantItems;
