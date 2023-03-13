import Observable from '../Observable';
import { Restaurant } from '../types/Restaurant.js';

class DetailRestaurant extends Observable {
  private restaurantDetail: Restaurant;

  constructor() {
    super();

    this.restaurantDetail = {
      category: '전체',
      storeName: '',
      distance: 0,
      detail: '',
      link: '',
      starShape: 'lined',
    };
  }

  setRestaurantDetail(restaurantDetail: Restaurant) {
    this.restaurantDetail = restaurantDetail;
    this.notify(restaurantDetail);
  }

  getRestaurantDetail() {
    return this.restaurantDetail;
  }
}

const detailRestaurant = new DetailRestaurant();
export default detailRestaurant;
