//즐겨찾기 기능 서비스

import RestaurantDBService from './RestaurantDBService';

class RestaurantFavoriteService {
  #restaurantDBService;
  constructor() {
    this.#restaurantDBService = new RestaurantDBService();
  }

  showFavoriteRestaurants() {
    //TODO: DB 서비스에 getFavorite이 들어가는 게 맞는지 확인할 것
    return this.#restaurantDBService.getFavorite();
  }
}

export default RestaurantFavoriteService;
