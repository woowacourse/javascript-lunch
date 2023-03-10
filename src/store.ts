import { Restaurant, CategoryFilter, SortFilter } from './types';
import { initialRestaurants } from './restaurants';

class Store {
  restaurants: Restaurant[];
  renderedRestaurants: Restaurant[];
  categoryFilter: CategoryFilter;
  sortFilter: SortFilter;

  constructor() {
    this.restaurants = [];
    this.renderedRestaurants = [];
    this.categoryFilter = '전체';
    this.sortFilter = 'name';
  }

  initRestaurants() {
    if (!localStorage.getItem('store')) {
      this.setRestaurants(initialRestaurants);
    }
    this.restaurants = JSON.parse(localStorage.getItem('store') || '[]');
    this.sortRestaurants(this.sortFilter);
  }

  setRestaurants(restaurants: Restaurant[]) {
    localStorage.setItem('store', JSON.stringify(restaurants));
  }

  setSelectedRestaurants() {
    this.filterRestaurants(this.categoryFilter);
    this.sortRestaurants(this.sortFilter);
  }

  addRestaurants(restaurant: Restaurant) {
    this.restaurants = [...this.restaurants, restaurant];
    this.setRestaurants(this.restaurants);

    this.setSelectedRestaurants();
  }

  filterRestaurants(categoryFilter: CategoryFilter) {
    this.categoryFilter = categoryFilter;

    if (categoryFilter === '전체') {
      this.renderedRestaurants = this.restaurants;
      return;
    }
    const renderedRestaurants = this.restaurants.filter(
      (restaurant) => restaurant.category === categoryFilter,
    );
    this.renderedRestaurants = renderedRestaurants;
  }

  sortRestaurants(sortFilter: SortFilter) {
    this.sortFilter = sortFilter;
    switch (sortFilter) {
      case 'name':
        this.renderedRestaurants.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case 'distance':
        this.renderedRestaurants.sort((a, b) => a.distance - b.distance);
        break;
    }
  }

  deleteRestaurant(name: string) {
    this.restaurants = this.restaurants.filter((restaurant) => restaurant.name !== name);
    this.setRestaurants(this.restaurants);
    this.setSelectedRestaurants();
  }

  toggleFavoriteRestaurant(name: string) {
    const restaurant = this.restaurants.find((restaurant) => restaurant.name === name);
    restaurant!.favorite = !restaurant?.favorite;
    this.setRestaurants(this.restaurants);
    this.setSelectedRestaurants();
  }

  favoriteRestaurants(tab: string) {
    if (tab === 'all') {
      this.renderedRestaurants = this.restaurants;
      this.setSelectedRestaurants();
      return;
    }
    const favoriteRestaurants = this.restaurants.filter((restaurant) => restaurant.favorite);
    this.renderedRestaurants = favoriteRestaurants;
  }
}

export default Store;
