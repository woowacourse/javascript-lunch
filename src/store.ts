import RestaurantItems from './components/RestaurantItems';
import { Restaurant, CategoryFilter, SortFilter, Restaurants } from './types';
import { v4 as uuid } from 'uuid';

interface Store {
  restaurants: Restaurants;
  categoryFilter: CategoryFilter;
  sortFilter: SortFilter;
  removeRestaurant: (restaurant: Restaurant) => void;
  addRestaurants: (restaurant: Restaurant) => void;
  filterRestaurants: (categoryFilter: CategoryFilter) => void;
  sortRestaurants: (sortFilter: SortFilter) => void;
}

export const store: Store = {
  restaurants: {},
  categoryFilter: '전체',
  sortFilter: 'name',

  removeRestaurant(target: Restaurant) {
    // this.restaurants = this.restaurants.filter((restaurant) => !_.isEqual(restaurant, target));
    // const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
    //   typeof RestaurantItems
    // >;
    // $restaurantItems.render(this.restaurants);
    // localStorage.setItem('store', JSON.stringify(this.restaurants));
    // this.filterRestaurants(this.categoryFilter);
    // this.sortRestaurants(this.sortFilter);
  },

  addRestaurants(restaurant: Restaurant) {
    this.restaurants = { [uuid()]: restaurant, ...this.restaurants };
    const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
      typeof RestaurantItems
    >;
    $restaurantItems.render(this.restaurants);
    localStorage.setItem(
      'store',
      JSON.stringify({
        [uuid()]: restaurant,
        ...JSON.parse(localStorage.getItem('store') || '{}'),
      }),
    );
    this.filterRestaurants(this.categoryFilter);
    this.sortRestaurants(this.sortFilter);
  },

  filterRestaurants(categoryFilter: CategoryFilter) {
    this.categoryFilter = categoryFilter;
    const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
      typeof RestaurantItems
    >;
    this.restaurants = JSON.parse(localStorage.getItem('store') || '{}');
    if (categoryFilter === '전체') {
      return $restaurantItems.render(this.restaurants);
    }
    const filteredRestaurants = Object.fromEntries(
      Object.entries(this.restaurants).filter(
        ([_, restaurant]) => restaurant.category === categoryFilter,
      ),
    );
    this.restaurants = filteredRestaurants;
    $restaurantItems.render(this.restaurants);
  },

  sortRestaurants(sortFilter: SortFilter) {
    this.sortFilter = sortFilter;
    const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
      typeof RestaurantItems
    >;
    let filteredRestaurants;

    switch (sortFilter) {
      case 'name':
        filteredRestaurants = Object.fromEntries(
          Object.entries(this.restaurants).sort(([a_, a_restaurant], [b_, b_restaurant]) =>
            a_restaurant.name > b_restaurant.name ? 1 : -1,
          ),
        );
        break;
      case 'distance':
        filteredRestaurants = Object.fromEntries(
          Object.entries(this.restaurants).sort(
            ([a_, a_restaurant], [b_, b_restaurant]) =>
              a_restaurant.distance - b_restaurant.distance,
          ),
        );
        break;
    }
    $restaurantItems.render(filteredRestaurants);
  },
};

export default store;
