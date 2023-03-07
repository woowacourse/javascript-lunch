import { $ } from '../utils';
import { CategoryAll, RestaurantInfo, SortTypeAll } from './RestaurantTypes';

interface Restaurant {
  restaurants: RestaurantInfo[];
  addRestaurant: (restaurant: RestaurantInfo) => void;
  filterByCategory: (category: CategoryAll) => void;
  sortByType: (type: SortTypeAll) => void;
}

export const restaurant: Restaurant = {
  restaurants: [],

  addRestaurant(restaurant: RestaurantInfo) {
    this.restaurants = [...this.restaurants, restaurant];
    $('restaurant-box').renderRestaurantList(this.restaurants);

    const restaurantsString = JSON.stringify(this.restaurants);
    localStorage.setItem('restaurant', restaurantsString);
  },

  filterByCategory(category: CategoryAll) {
    if (category === '전체') {
      return $('restaurant-box').renderRestaurantList(this.restaurants);
    }
    const filteredCategory = this.restaurants.filter(
      (list) => list.category === category
    );
    $('restaurant-box').renderRestaurantList(filteredCategory);
  },

  sortByType(type: SortTypeAll) {
    if (type === '거리순') {
      const sortBydistance = this.restaurants.sort(
        (aRestaurant, bRestaurant) =>
          aRestaurant.distance - bRestaurant.distance
      );
      $('restaurant-box').renderRestaurantList(sortBydistance);
    } else if (type === '이름순') {
      const sortByName = this.restaurants.sort((aRestaurant, bRestaurant) =>
        aRestaurant.name > bRestaurant.name ? 1 : -1
      );
      $('restaurant-box').renderRestaurantList(sortByName);
    }
  },
};
