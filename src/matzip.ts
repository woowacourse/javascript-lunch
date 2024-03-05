import { MatzipInterface, RestaurantType } from './types';
import Restaurant from './domain/Restaurant';
import { CategoryValidator, NameValidator } from './validator/index';

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
    NameValidator.empty(restaurant.name);
  }
}

export default Matzip;
