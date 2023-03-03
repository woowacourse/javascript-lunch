import $template from './index.html';
import { store } from '../../store';
import { Restaurant } from '../../types';

class RestaurantItems extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render(store.restaurants);
  }

  render(restaurants: Restaurant[]) {
    this.innerHTML = $template;
    const $restaurantList = this.querySelector('.restaurant-list') as HTMLElement;

    restaurants.forEach((restaurant) => {
      const { category, name, distance, description } = restaurant;

      $restaurantList.insertAdjacentHTML(
        'beforeend',
        `<restaurant-item category=${category} name=${name} distance=${distance} description=${description}></restaurant-item>`,
      );
    });
  }
}

export default RestaurantItems;
