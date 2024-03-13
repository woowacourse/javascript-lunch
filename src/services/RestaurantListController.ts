import { STORAGE_KEY } from '../constants';
import { RestaurantList } from '../domains';
import { RestaurantInfo } from '../types';

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

    const noneRestaurant = /* html */ `<p id="none-restaurant-category">해당 카테고리의 음식점이 존재하지 않습니다.</p>`;
    if ($list) {
      $list.innerHTML = restaurantListText || noneRestaurant;
    }
  },
};

export default RestaurantListController;
