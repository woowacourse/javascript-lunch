import { STORAGE_KEY } from '../constants/index.ts';
import { INITIAL_RESTAURANT_DATA } from '../data/restaurantData.ts';
import { RestaurantInfo } from '../types/index.ts';

const RestaurantListController = {
  updateLocalStorage() {
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

    const innerHTML = restaurantList
      ?.map(
        (info: RestaurantInfo) =>
          `<restaurant-box name="${info.name}"></restaurant-box>`,
      )
      .join('');

    if (listEl) {
      listEl.innerHTML =
        innerHTML ||
        '<p id="none-restaurant">해당 카테고리의 음식점이 존재하지 않습니다.</p>';
    }
  },
};

export default RestaurantListController;
