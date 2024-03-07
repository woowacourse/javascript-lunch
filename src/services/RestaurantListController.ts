import { RestaurantInfo } from '../types';
import { RestaurantList } from '../domains';
import '../components/Restaurant/index.ts';

const RestaurantListController = {
  injectRestaurantListHTML() {
    const restaurantList = new RestaurantList().list;
    const listEl = document.querySelector('.restaurant-list');

    const innerHTML = restaurantList
      ?.map((info: RestaurantInfo) => {
        return `<restaurant-box name="${info.name}"></restaurant-box>`;
      })
      .join('');

    if (innerHTML && listEl) {
      listEl.innerHTML = innerHTML;
    }
  },
};

export default RestaurantListController;
