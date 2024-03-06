import { RestaurantInfo } from '../types';
import { RestaurantList } from '../domains';
import { RestaurantComponent } from '../components';

const RestaurantListController = {
  injectRestaurantListHTML() {
    const restaurantList = new RestaurantList().list;
    const listEl = document.querySelector('.restaurant-list');
    const fragmentElement = document.createDocumentFragment();

    restaurantList?.forEach((info: RestaurantInfo) => {
      new RestaurantComponent(fragmentElement, info);
    });

    listEl?.appendChild(fragmentElement);
  },
};

export default RestaurantListController;
