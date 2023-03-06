import { Restaurant, CategoryFilter, SortFilter } from './types';
import RestaurantItems from './components/RestaurantItems';
import { restaurants } from './restaurants';
import { $ } from './utils/dom';

interface Store {
  restaurants: Restaurant[];
  categoryFilter: CategoryFilter;
  sortFilter: SortFilter;
  initRestaurants: () => void;
  getRestuarants: () => Restaurant[];
  addRestaurants: (restaurant: Restaurant) => void;
  filterRestaurants: (categoryFilter: CategoryFilter) => void;
  sortRestaurants: (sortFilter: SortFilter) => void;
}

export const store: Store = {
  restaurants: [],
  categoryFilter: '전체',
  sortFilter: 'name',

  initRestaurants() {
    if (!localStorage.getItem('store')) {
      localStorage.setItem('store', JSON.stringify(restaurants));
    }
    this.restaurants = JSON.parse(localStorage.getItem('store') || '[]');
  },

  getRestuarants() {
    store.restaurants = JSON.parse(localStorage.getItem('store') || '[]');
    return store.restaurants;
  },

  addRestaurants(restaurant: Restaurant) {
    const $restaurantItems = $<RestaurantItems>('restaurant-items');
    this.restaurants = [...this.restaurants, restaurant];
    localStorage.setItem('store', JSON.stringify([...this.getRestuarants(), restaurant]));

    this.filterRestaurants(this.categoryFilter);
    this.sortRestaurants(this.sortFilter);
    $restaurantItems.render(this.restaurants);
  },

  filterRestaurants(categoryFilter: CategoryFilter) {
    this.categoryFilter = categoryFilter;
    const $restaurantItems = $<RestaurantItems>('restaurant-items');
    this.restaurants = this.getRestuarants();

    if (categoryFilter === '전체') {
      return $restaurantItems?.render(this.restaurants);
    }
    const filteredRestaurants = this.restaurants.filter(
      (restaurant) => restaurant.category === categoryFilter,
    );
    this.restaurants = filteredRestaurants;
    $restaurantItems.render(this.restaurants);
  },

  sortRestaurants(sortFilter: SortFilter) {
    this.sortFilter = sortFilter;
    const $restaurantItems = $<RestaurantItems>('restaurant-items');
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
