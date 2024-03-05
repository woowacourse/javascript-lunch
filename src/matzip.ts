import { MatzipInterface, RestaurantType } from './types';
import Restaurant from './domain/Restaurant';
import { CategoryValidator, NameValidator, DistanceValidator } from './validator/index';

class Matzip implements MatzipInterface {
  restaurants: Restaurant[] = [];

  constructor(restaurants: Restaurant[]) {
    this.restaurants = restaurants;
  }

  add(restaurant: RestaurantType) {
    this.addValidate(restaurant);
    const newRestaurant = new Restaurant(restaurant);
    this.restaurants.push(newRestaurant);
  }

  addValidate(restaurant: RestaurantType) {
    CategoryValidator.empty(restaurant.category + '');
    CategoryValidator.exist(restaurant.category + '');
    NameValidator.empty(restaurant.name);
    DistanceValidator.empty(restaurant.distance);
    DistanceValidator.exist(restaurant.distance);
  }
}

export default Matzip;
