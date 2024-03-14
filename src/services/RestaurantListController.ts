import { RestaurantInfo } from '../types';
import { INITIAL_RESTAURANT_DATA } from '../data/restaurantData';
import { StorageKeyEnum } from '../constants';

const RestaurantListController = {
  updateLocalStorage() {
    const data = localStorage.getItem(StorageKeyEnum.restaurants);

    if (!data) {
      console.log('dd', INITIAL_RESTAURANT_DATA);
      localStorage.setItem(
        StorageKeyEnum.restaurants,
        JSON.stringify(INITIAL_RESTAURANT_DATA),
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
        innerHTML ||
        '<p id="none-restaurant">해당 카테고리의 음식점이 존재하지 않습니다.</p>';
    }
  },
};

export default RestaurantListController;
