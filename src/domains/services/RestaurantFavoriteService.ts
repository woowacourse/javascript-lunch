import { $ } from '@/utils/DOM';
import RestaurantCollection from '../entities/RestaurantCollection';
import RestaurantDBService from './RestaurantDBService';

class RestaurantFavoriteService {
  #restaurantDBService;
  #restaurantCollection;

  constructor() {
    this.#restaurantDBService = new RestaurantDBService();
    this.#restaurantCollection = new RestaurantCollection([]);
  }

  showFavoriteRestaurants() {
    this.#restaurantCollection = this.#restaurantDBService.update();
    this.#restaurantCollection.filterFavorites();
    this.#rerenderByFavoriteFilter();
  }

  #rerenderByFavoriteFilter() {
    const event = new CustomEvent('change', {
      bubbles: true,
      cancelable: true,
      detail: {
        collection: this.#restaurantCollection,
      },
    });
    $('.restaurant-filter-container').dispatchEvent(event);
  }

  rerenderByFilter() {
    const event = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    $('.restaurant-filter-container').dispatchEvent(event);
  }
}

export default RestaurantFavoriteService;
