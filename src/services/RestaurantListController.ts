import { RestaurantInfo } from '../types';
import { INITIAL_RESTAURANT_DATA } from '../data/restaurantData';
import { StorageKeyEnum } from '../constants';
import LocalStorageService from './LocalStorageService';

const RestaurantListController = {
  updateLocalStorage() {
    const data = LocalStorageService.getData(StorageKeyEnum.restaurants);

    if (!data) {
      LocalStorageService.setData(
        StorageKeyEnum.restaurants,
        INITIAL_RESTAURANT_DATA,
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
