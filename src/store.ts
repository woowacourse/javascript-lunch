import RestaurantItems from './components/RestaurantItems';
import { Restaurant, CategoryFilter, SortFilter } from './types';

interface Store {
  restaurants: Restaurant[];
  categoryFilter: CategoryFilter;
  sortFilter: SortFilter;
  addRestaurants: (restaurant: Restaurant) => void;
  filterRestaurants: (categoryFilter: CategoryFilter) => void;
  sortRestaurants: (sortFilter: SortFilter) => void;
}

export const store: Store = {
  restaurants: [],
  categoryFilter: '전체',
  sortFilter: 'name',

  addRestaurants(restaurant: Restaurant) {
    this.restaurants = [...this.restaurants, restaurant];
    const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
      typeof RestaurantItems
    >;
    $restaurantItems.render(this.restaurants);
    localStorage.setItem(
      'store',
      JSON.stringify([...JSON.parse(localStorage.getItem('store') || '[]'), restaurant]),
    );
    this.filterRestaurants(this.categoryFilter);
    this.sortRestaurants(this.sortFilter);
  },

  filterRestaurants(categoryFilter: CategoryFilter) {
    this.categoryFilter = categoryFilter;
    const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
      typeof RestaurantItems
    >;
    this.restaurants = JSON.parse(localStorage.getItem('store') || '[]');
    if (categoryFilter === '전체') {
      return $restaurantItems.render(this.restaurants);
    }
    const filteredRestaurants = this.restaurants.filter(
      (restaurant) => restaurant.category === categoryFilter,
    );
    this.restaurants = filteredRestaurants;
    $restaurantItems.render(this.restaurants);
  },

  sortRestaurants(sortFilter: SortFilter) {
    this.sortFilter = sortFilter;
    const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
      typeof RestaurantItems
    >;
    switch (sortFilter) {
      case 'name':
        this.restaurants.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case 'distance':
        this.restaurants.sort((a, b) => a.distance - b.distance);
        break;
    }
    $restaurantItems.render(this.restaurants);
  },
};

export default store;
