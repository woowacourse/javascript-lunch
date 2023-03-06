import { Restaurant, CategoryFilter, SortFilter } from './types';
import RestaurantItems from './components/RestaurantItems';
import { restaurants } from './restaurants';

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
    this.restaurants = [...this.restaurants, restaurant];
    const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
      typeof RestaurantItems
    >;
    $restaurantItems.render(this.restaurants);
    localStorage.setItem('store', JSON.stringify([...this.getRestuarants(), restaurant]));
    this.filterRestaurants(this.categoryFilter);
    this.sortRestaurants(this.sortFilter);
  },

  filterRestaurants(categoryFilter: CategoryFilter) {
    this.categoryFilter = categoryFilter;
    const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
      typeof RestaurantItems
    >;
    this.restaurants = this.getRestuarants();

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
