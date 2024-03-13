import './style.css';
<<<<<<< HEAD
import '../LunchItem/LunchItem';

import { RestaurantDataProvider } from '../../domain/index';

import { Category, Restaurant, Restaurants, SortBy } from '../../types/index';
=======
import LunchItem from '../LunchItem/LunchItem';

import { RestaurantDataProvider } from '../../domain/index';

import { Category, Restaurants, SortBy } from '../../types/index';
>>>>>>> step1

export interface FilterProps {
  category?: Category;
  sortBy?: SortBy;
}

const LUNCH_ITEMS = `
  <section class="restaurant-list-container">
    <ul class="restaurant-list">
    </ul>
  </section>
`;
<<<<<<< HEAD

const LUNCH_ITEM = (restaurant: Restaurant) => `
  <lunch-item category="${restaurant.category}" name="${restaurant.name}" distance="${restaurant.distance
  }" description="${restaurant.description ?? ''}"></lunch-item>
`;

=======
>>>>>>> step1
class LunchItems extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderItems({});
  }

  render(): void {
    this.innerHTML = LUNCH_ITEMS;
  }

  renderItems(props: FilterProps): void {
<<<<<<< HEAD
    const itemHTMLs: string[] = [];
    this.getRestaurants(props).forEach((restaurant) => {
      itemHTMLs.push(LUNCH_ITEM(restaurant));
    });
    const itemsHTML = this.querySelector('.restaurant-list');
    if (itemsHTML) {
      itemsHTML.innerHTML = itemHTMLs.join('');
    }
=======
    const container = this.querySelector('.restaurant-list');
    container?.childNodes.forEach((child) => child.remove());
    this.getRestaurants(props).forEach((restaurant) => {
      container?.insertAdjacentElement('beforebegin', new LunchItem(restaurant));
    });
>>>>>>> step1
  }

  getRestaurants(props: FilterProps): Restaurants {
    return RestaurantDataProvider.getAllRestaurantsByOption(props);
  }
}

customElements.define('lunch-items', LunchItems);

export default LunchItems;
