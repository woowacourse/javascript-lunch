import RestaurantBox from '../components/RestaurantBox';
import { $ } from '../utils';
import { RestaurantInfo } from './RestaurantTypes';

interface Restaurant {
  restaurants: RestaurantInfo[];
  addRestaurant: (restaurant: RestaurantInfo) => void;
}

export const restaurant: Restaurant = {
  restaurants: [],

  addRestaurant(restaurant: RestaurantInfo) {
    this.restaurants = [...this.restaurants, restaurant];
    const restaurantBox = new RestaurantBox();
    restaurantBox.renderRestaurantList(this.restaurants);
  },
};
