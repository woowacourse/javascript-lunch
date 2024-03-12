import { STORAGE_KEY } from '../constants';
import { INITIAL_RESTAURANT_DATA } from '../data/restaurantData';
import { RestaurantInfo } from '../types';

const RestaurantListController = {
  saveInitialDataToLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY.restaurants);

    if (!data) {
      localStorage.setItem(
        STORAGE_KEY.restaurants,
        JSON.stringify(INITIAL_RESTAURANT_DATA),
      );
    }
  },

  injectRestaurantListHTML(restaurantList?: RestaurantInfo[]) {
    const listEl = document.querySelector('.restaurant-list');

    const restaurantListText = restaurantList
      ?.map(
        (info: RestaurantInfo) =>
          `<restaurant-item name="${info.name}"></restaurant-item>`,
      )
      .join('');

    const noneRestaurant = /* html */ `<p id="none-restaurant-category">해당 카테고리의 음식점이 존재하지 않습니다.</p>`;
    if (listEl) {
      listEl.innerHTML = restaurantListText || noneRestaurant;
    }
  },
};

export default RestaurantListController;
