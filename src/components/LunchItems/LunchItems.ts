import './style.css';
import '../LunchItem/LunchItem';

import { RestaurantDataProvider } from '../../domain/index';

import { Category, Restaurant, Restaurants } from '../../types/index';

const LUNCH_ITEMS = `
<section class="restaurant-list-container">
  <ul class="restaurant-list">
  </ul>
</section>`;

const LUNCH_ITEM = (restaurant: Restaurant) => `
<lunch-item category=${restaurant.category} name=${restaurant.name} distance=${restaurant.distance} description=${restaurant.description ?? ''}>
  </lunch-item>`;

class LunchItems extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderItems();
  }

  render(): void {
    this.innerHTML = LUNCH_ITEMS;
  }

  renderItems(): void {
    const itemHTMLs: string[] = [];
    this.getRestaurants().forEach((restaurant) => {
      itemHTMLs.push(LUNCH_ITEM(restaurant));
    });
    const itemsHTML = this.querySelector('.restaurant-list');
    if (itemsHTML) {
      itemsHTML.innerHTML = itemHTMLs.join('');
    }
  }

  getRestaurants(): Restaurants {
    const prop: Category | undefined = undefined;
    return RestaurantDataProvider.execute({ category: prop, sortBy: '최신순' });
  }
}

customElements.define('lunch-items', LunchItems);
