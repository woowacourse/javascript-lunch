import { MatzipInterface, Restaurant } from './types';
import { CategoryValidator, NameValidator, DistanceValidator } from './validator/index';

class Matzip implements MatzipInterface {
  restaurants: Restaurant[] = [];

  constructor(restaurants: Restaurant[]) {
    this.restaurants = restaurants;
  }

  add(restaurant: Restaurant) {
    this.addValidate(restaurant);
    this.restaurants.push(restaurant);
  }

  addValidate(restaurant: Restaurant) {
    CategoryValidator.empty(restaurant.category + '');
    CategoryValidator.exist(restaurant.category + '');
    NameValidator.empty(restaurant.name);
    DistanceValidator.empty(restaurant.distance);
    DistanceValidator.exist(restaurant.distance);
  }
}

export default Matzip;
