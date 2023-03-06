import { Restaurant, CategoryFilter, SortFilter } from './types';
import { initialRestaurants } from './restaurants';

class Store {
  restaurants: Restaurant[];
  categoryFilter: CategoryFilter;
  sortFilter: SortFilter;

  constructor() {
    this.restaurants = [];
    this.categoryFilter = '전체';
    this.sortFilter = 'name';
  }

  initRestaurants() {
    if (!localStorage.getItem('store')) {
      this.setRestaurants(initialRestaurants);
    }
    this.restaurants = this.getAllRestuarants();
    this.sortRestaurants(this.sortFilter);
  }

  setRestaurants(restaurants: Restaurant[]) {
    localStorage.setItem('store', JSON.stringify(restaurants));
  }

  getAllRestuarants() {
    this.restaurants = JSON.parse(localStorage.getItem('store') || '[]');
    return this.restaurants;
  }

  addRestaurants(restaurant: Restaurant) {
    this.restaurants = [...this.restaurants, restaurant];
    this.setRestaurants([...this.getAllRestuarants(), restaurant]);

    this.filterRestaurants(this.categoryFilter);
    this.sortRestaurants(this.sortFilter);
  }

  filterRestaurants(categoryFilter: CategoryFilter) {
    this.categoryFilter = categoryFilter;
    this.restaurants = this.getAllRestuarants();

    if (categoryFilter === '전체') return;
    const filteredRestaurants = this.restaurants.filter(
      (restaurant) => restaurant.category === categoryFilter,
    );
    this.restaurants = filteredRestaurants;
  }

  sortRestaurants(sortFilter: SortFilter) {
    this.sortFilter = sortFilter;
    switch (sortFilter) {
      case 'name':
        this.restaurants.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case 'distance':
        this.restaurants.sort((a, b) => a.distance - b.distance);
        break;
    }
  }
}

export default Store;
