import { RestaurantInfo } from '../types';
import InitialRestaurantData from '../data/restaurantData';
import { StorageKeyEnum } from '../constants';

const RestaurantListController = {
  updateLocalStorage() {
    const data = localStorage.getItem(StorageKeyEnum.restaurants);

    if (!data) {
      localStorage.setItem(
        StorageKeyEnum.restaurants,
        JSON.stringify(InitialRestaurantData),
      );
    }
  },

  injectRestaurantListHTML(restaurantList?: RestaurantInfo[]) {
    const listEl = document.querySelector('.restaurant-list');

    const innerHTML = restaurantList
      ?.map((info: RestaurantInfo) => {
        return `<restaurant-box name="${info.name}"></restaurant-box>`;
      })
      .join('');

    if (listEl) {
      listEl.innerHTML =
        innerHTML || '<p id="none-restaurant">찾으시는 음식점이 없습니다.</p>';
    }
  },
};

export default RestaurantListController;
