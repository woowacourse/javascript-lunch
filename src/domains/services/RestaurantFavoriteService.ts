//즐겨찾기 기능 서비스

import RestaurantDBService from './RestaurantDBService';

class RestaurantFavoriteService {
  #restaurantDBService;
  constructor() {
    this.#restaurantDBService = new RestaurantDBService();
  }

  showFavoriteRestaurants() {
    //TODO: DB 서비스에 getFavorite이 들어가는 게 맞는지 확인할 것
    //TODO: DB 에는 진짜 로컬 스토리지를 관장하는 코드만 들어가야 하냐?
    //Collection을 어디서 관리하는 게 나을까?
    return this.#restaurantDBService.getFavorite();
  }
}

export default RestaurantFavoriteService;
