import { Restaurant } from '../types/Restaurant';
import FavoriteRestaurantsRegistry from './FavoriteRestaurantsRegistry';

/**
 * @param {Object} 새로운 가게 등록 후 local에 저장
 */
const RestaurantRegistry = {
  registerOneRestaurant(newRestaurant: Restaurant) {
    const allRestaurants: Restaurant[] = JSON.parse(localStorage.getItem('restaurants') ?? '[]');
    allRestaurants.push(newRestaurant);
    localStorage.setItem('restaurants', JSON.stringify(allRestaurants));
  },

  deleteOneRestaurant(restaurant: Restaurant) {
    if (this.hasOneRestaurant(restaurant)) {
      const allRestaurants: Restaurant[] = JSON.parse(localStorage.getItem('restaurants') ?? '[]');
      const removedRestaurants = allRestaurants.filter((value) => value.name !== restaurant.name);
      localStorage.setItem('restaurants', JSON.stringify(removedRestaurants));
    }

    FavoriteRestaurantsRegistry.unlikeOneRestaurant(restaurant);
  },

  hasOneRestaurant(restaurant: Restaurant) {
    const allRestaurants: Restaurant[] = JSON.parse(localStorage.getItem('restaurants') ?? '[]');
    return allRestaurants.some((value) => value.name === restaurant.name);
  },
};

export default RestaurantRegistry;
