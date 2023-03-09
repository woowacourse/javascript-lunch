import { $ } from '../utils';
import { CategoryAll, RestaurantInfo, SortTypeAll } from './RestaurantTypes';

interface Restaurant {
  restaurants: RestaurantInfo[];
  filteredRestaurants: RestaurantInfo[];
  addRestaurant: (restaurant: RestaurantInfo) => void;
  filterByCategory: (category: CategoryAll) => void;
  sortByType: (type: SortTypeAll) => void;
}

export const restaurant: Restaurant = {
  restaurants: [],
  filteredRestaurants: [],

  addRestaurant(restaurant: RestaurantInfo) {
    this.restaurants = [...this.restaurants, restaurant];

    const restaurantsString = JSON.stringify(this.restaurants);
    localStorage.setItem('restaurant', restaurantsString);
    this.filterByCategory('전체');

    $('restaurant-box').renderRestaurantList(this.restaurants);
  },

  filterByCategory(category: CategoryAll) {
    if (category === '전체') {
      this.filteredRestaurants = [...this.restaurants];
    } else {
      this.filteredRestaurants = this.restaurants.filter(
        (list) => list.category === category
      );
    }

    $('restaurant-box').renderRestaurantList(this.filteredRestaurants);
  },

  sortByType(type: SortTypeAll) {
    if (this.filteredRestaurants.length === 0) {
      this.filteredRestaurants = [...this.restaurants];
    }
    if (type === '거리순') {
      const sortBydistance = this.filteredRestaurants.sort(
        (aRestaurant, bRestaurant) =>
          aRestaurant.distance - bRestaurant.distance
      );
      $('restaurant-box').renderRestaurantList(sortBydistance);
    } else if (type === '이름순') {
      const sortByName = this.filteredRestaurants.sort(
        (aRestaurant, bRestaurant) =>
          aRestaurant.name > bRestaurant.name ? 1 : -1
      );
      $('restaurant-box').renderRestaurantList(sortByName);
    }
  },
};
