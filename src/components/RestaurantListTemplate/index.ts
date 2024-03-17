import './style.css';

import { RestaurantList } from '../../domains';
import { RestaurantListController } from '../../services';
import { RestaurantInfo } from '../../types';

class RestaurantListTemplate extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const $list = document.createElement('ul');
    $list.className = 'restaurant-list';

    this.appendChild($list);

    const listCategory = this.getAttribute('list-category');

    if (listCategory === 'favorite') {
      const restaurantList = new RestaurantList();
      this.injectRestaurantItemsToList(restaurantList.filterFavorites());
    }
  }

  injectRestaurantItemsToList(list: RestaurantInfo[] | undefined) {
    RestaurantListController.injectRestaurantList(list);
  }
}
export default RestaurantListTemplate;

customElements.define('restaurant-list', RestaurantListTemplate);
