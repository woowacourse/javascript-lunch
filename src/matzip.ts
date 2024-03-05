import { MatzipInterface, RestaurantType } from './types';
import Restaurant from './domain/Restaurant';
import CategoryValidator from './validator/CategoryValidator';

class Matzip implements MatzipInterface {
  restaurants: Restaurant[] = [];

  constructor(restaurants: Restaurant[]) {
    this.restaurants = restaurants;
  }

  add(restaurant: RestaurantType) {
    const newRestaurant = new Restaurant(restaurant);
    this.restaurants.push(newRestaurant);
  }

  addValidate(restaurant: RestaurantType) {
    CategoryValidator.empty(restaurant.category + '');
    CategoryValidator.exist(restaurant.category + '');
  }
}

export default Matzip;
