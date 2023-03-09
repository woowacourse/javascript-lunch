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
    const { category, name, distance, description } = restaurant;
    return `<restaurant-item category=${category} name=${name} distance=${distance} description=${description}></restaurant-item>`;
  }

  addBottomSheetHandler(handler: CallableFunction) {
    this.addEventListener('click', (e: any) => {
      const target = e.target.closest('li');
      const category = target.querySelector('.category-icon').alt;
      const name = target.querySelector('.restaurant__name').textContent;
      const distance = target.querySelector('.restaurant__distance').textContent;
      const description = target.querySelector('.restaurant__description').textContent;
      const restaurant = {
        category: category,
        name: name,
        distance: distance,
        description: description,
      };
      handler(restaurant);
    });
  }
}

export default RestaurantItems;
