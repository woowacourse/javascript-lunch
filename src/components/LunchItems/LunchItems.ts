import './style.css';
import LunchItem from '../LunchItem/LunchItem';

import { RestaurantDataProvider } from '../../domain/index';

import { Category, Restaurants, SortBy } from '../../types/index';

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
class LunchItems extends HTMLElement {
  connectedCallback() {
    this.render();
    this.renderItems({});
  }

  render(): void {
    this.innerHTML = LUNCH_ITEMS;
  }

  renderItems(props: FilterProps): void {
    const container = this.querySelector('.restaurant-list');
    container?.childNodes.forEach((child) => child.remove());
    this.getRestaurants(props).forEach((restaurant) => {
      container?.insertAdjacentElement('beforebegin', new LunchItem(restaurant));
    });
  }

  getRestaurants(props: FilterProps): Restaurants {
    return RestaurantDataProvider.getAllRestaurantsByOption(props);
  }
}

customElements.define('lunch-items', LunchItems);

export default LunchItems;
