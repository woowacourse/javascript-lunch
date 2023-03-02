import $template from './index.html';
import { store } from '../../store';

class RestaurantItems extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = $template;
    const $restaurantList = this.querySelector('.restaurant-list') as HTMLElement;

    store.restaurants.forEach((restaurant) => {
      const { category, name, distance, description } = restaurant;

      $restaurantList.insertAdjacentHTML(
        'beforeend',
        `<restaurant-item category=${category} name=${name} distance=${distance} description=${description}></restaurant-item>`,
      );
    });
  }
}

export default RestaurantItems;
