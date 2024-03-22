import './style.css';
import LunchItem from '../LunchItem/LunchItem';

import { RestaurantDataProvider } from '../../domain/index';

import { Category, Restaurants, SortBy } from '../../types/index';
import LunchFallbackScreen from '../LunchFallbackScreen/LunchFallbackScreen';
import { databaseType } from '../../api/Collection';

export interface FilterProps {
  category?: Category;
  sortBy?: SortBy;
  database?: databaseType;
}

const LUNCH_ITEMS = `
  <section class="restaurant-list-container">
    <ul class="restaurant-list">
    </ul>
  </section>
`;
class LunchItems extends HTMLElement {
  connectedCallback() {
    this.render({});
  }

  render(props: FilterProps): void {
    const restaurants = this.getRestaurants(props);
    if (restaurants.length === 0) {
      this.renderFallbackScreen(props);
    } else {
      this.renderItems(restaurants);
    }
  }

  renderItems(restaurants: Restaurants): void {
    this.innerHTML = LUNCH_ITEMS;
    const container = this.querySelector('.restaurant-list');
    restaurants.forEach((restaurant) => {
      container?.insertAdjacentElement('beforeend', new LunchItem(restaurant));
    });
  }

  // eslint-disable-next-line max-lines-per-function
  renderFallbackScreen(props: FilterProps) {
    this.innerHTML = '';
    if (props.database === 'liked') {
      this.appendChild(
        new LunchFallbackScreen({
          text: '즐겨찾는 음식점이 없어요!',
        }),
      );
    } else {
      this.appendChild(
        new LunchFallbackScreen({
          text: '등록된 음식점이 없어요!',
          buttonText: '음식점 등록하기',
          onClick: this.dispatchToggleRegisterModalEvent.bind(this),
        }),
      );
    }
  }

  dispatchToggleRegisterModalEvent() {
    const toggleRegisterModal = new CustomEvent('toggleRegisterModal', {
      bubbles: true,
    });
    this.dispatchEvent(toggleRegisterModal);
  }

  // resetTab() {
  //   const resetFavoriteTab = new CustomEvent('resetFavoriteTab', { bubbles: true });
  //   this.dispatchEvent(resetFavoriteTab);
  // }

  getRestaurants(props: FilterProps): Restaurants {
    return RestaurantDataProvider.getAllRestaurantsByOption(props);
  }
}

customElements.define('lunch-items', LunchItems);

export default LunchItems;
