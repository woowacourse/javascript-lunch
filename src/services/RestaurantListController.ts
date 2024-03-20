import AllRestaurantList from '../components/AllRestaurantList';
import RestaurantListTemplate from '../components/RestaurantListTemplate';
import { STORAGE_KEY } from '../constants';
import { RestaurantList } from '../domains';
import { RestaurantInfo } from '../types/index';

const RestaurantListController = {
  /**
   * 사이트 초기에 실행 시, 서버 역할인 localStorage에 데이터를 채워 넣기
   */
  saveInitialDataToLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY.restaurants);

    if (!data) {
      new RestaurantList().saveListToLocalStore();
    }
  },
  /**
   * AllRestaurantList 인스턴스를 생성해 모든 음식점 리스트를 만드는 함수
   */
  injectAllRestaurantList(restaurantList: RestaurantInfo[] | undefined) {
    const $listContainer = document.querySelector('.restaurant-list-container');

    new AllRestaurantList({
      $parent: $listContainer,
      restaurantList,
    });
  },
  /**
   * 즐겨찾기 관련 props를 이용한 RestaurantListTemplate 인스턴스를 생성해 자주 가는 음식점 리스트를 만드는 함수
   */
  injectFavoriteRestaurantList() {
    const $listContainer = document.querySelector('.restaurant-list-container');

    new RestaurantListTemplate({
      $parent: $listContainer,
      restaurantList: new RestaurantList().filterFavorites(),
      classList: ['favorite-restaurant-list'],
    });
  },
};

export default RestaurantListController;
