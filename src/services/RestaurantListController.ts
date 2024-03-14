import { STORAGE_KEY } from '../constants';
import { RestaurantList } from '../domains';
import { RestaurantInfo } from '../types';

import FilteringController from './FilteringController';

const RestaurantListController = {
  // 사이트 초기에 실행 시, 서버 역할인 localStorage에 데이터를 채워 넣는다.
  saveInitialDataToLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY.restaurants);

    if (!data) {
      localStorage.setItem(
        STORAGE_KEY.restaurants,
        JSON.stringify(new RestaurantList().list),
      );
    }
  },

  injectRestaurantListHTML(restaurantList?: RestaurantInfo[]) {
    const $list = document.querySelector('.restaurant-list');

    const restaurantListText = restaurantList
      ?.map(
        (info: RestaurantInfo) =>
          `<restaurant-item name="${info.name}"></restaurant-item>`,
      )
      .join('');

    const noneRestaurant = '<none-restaurant></none-restaurant>';

    if ($list) {
      $list.innerHTML = restaurantListText || noneRestaurant;
    }
  },
  private_injectChildToListContainer(tag: string) {
    const $restaurantListContainer = document.querySelector(
      '.restaurant-list-container',
    );

    if ($restaurantListContainer) {
      $restaurantListContainer.firstChild?.remove();
      $restaurantListContainer.innerHTML = `<${tag}></${tag}>`;
    }
  },

  injectAllRestaurantList() {
    this.private_injectChildToListContainer('all-restaurant-list');

    FilteringController.showFilteredSortedList();
  },

  injectFavoriteRestaurantList() {
    this.private_injectChildToListContainer('favorite-restaurant-list');

    FilteringController.showFilteredSortedList();
  },
};

export default RestaurantListController;
