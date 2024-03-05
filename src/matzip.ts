import { MatzipInterface, RestaurantType } from './types';
import Restaurant from './domain/Restaurant';

class Matzip implements MatzipInterface {
  restaurants: Restaurant[] = [];

  constructor(restaurants: Restaurant[]) {
    this.restaurants = restaurants;
  }

  add(restaurant: RestaurantType) {
    const newRestaurant = new Restaurant(restaurant);
    this.restaurants.push(newRestaurant);
  }
}

export default Matzip;
