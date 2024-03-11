import { Restaurant } from '../types/Restaurant';

/**
 * @param {Object} 새로운 가게 등록 후 local에 저장
 */
const RestaurantRegister = {
  updateLocalStorage(newRestaurant: Restaurant) {
    const allRestaurants = JSON.parse(localStorage.getItem('restaurants') ?? '[]');
    allRestaurants.push(newRestaurant);
    localStorage.setItem('restaurants', JSON.stringify(allRestaurants));
  },
};

export default RestaurantRegister;
