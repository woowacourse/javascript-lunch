import RestaurantBox from '../components/RestaurantBox';
import { $ } from '../utils';
import { CategoryAll, RestaurantInfo, SortTypeAll } from './RestaurantTypes';

interface Restaurant {
  restaurants: RestaurantInfo[];
  addRestaurant: (restaurant: RestaurantInfo) => void;
  filterByCategory: (
    restaurantList: RestaurantInfo[],
    category: CategoryAll
  ) => void;
}

export const restaurant: Restaurant = {
  restaurants: [],

  addRestaurant(restaurant: RestaurantInfo) {
    this.restaurants = [...this.restaurants, restaurant];

    const restaurantBox = new RestaurantBox();
    restaurantBox.renderRestaurantList(this.restaurants);

    const restaurantsString = JSON.stringify(this.restaurants);
    window.localStorage.setItem('restaurant', restaurantsString);
  },

  filterByCategory(category: CategoryAll) {
    if (category === '전체') {
      return new RestaurantBox().renderRestaurantList(this.restaurants);
    }
    const filteredCategory = this.restaurants.filter(
      (list) => list.category === category
    );
    new RestaurantBox().renderRestaurantList(filteredCategory);
  },
};
