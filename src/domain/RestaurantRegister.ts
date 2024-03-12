import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';
import { Restaurant } from '../types/Restaurant';

/**
 * @param {Object} 새로운 가게 등록 후 local에 저장
 */
const RestaurantRegister = {
  updateLocalStorage(newRestaurant: Restaurant) {
    const allRestaurants = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.restaurants) ?? '[]');
    allRestaurants.push(newRestaurant);
    localStorage.setItem(LOCAL_STORAGE_KEYS.restaurants, JSON.stringify(allRestaurants));
  },
};

export default RestaurantRegister;
