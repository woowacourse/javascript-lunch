import db from './db/restaurants';
import { Restaurant, CategoryFilter, SortFilter, Restaurants } from './types';
import { v4 as uuid } from 'uuid';

interface Store {
  restaurants: Restaurants;
  categoryFilter: CategoryFilter;
  sortFilter: SortFilter;
  removeRestaurant: (restaurant: string) => void;
  addRestaurants: (restaurant: Restaurant) => void;
  filterRestaurants: (categoryFilter: CategoryFilter) => void;
  sortRestaurants: (sortFilter: SortFilter) => void;
  toggleFavoriteRestaurant: (id: string) => void;
  getFavoriteRestaurants: () => Restaurants;
}

export const store: Store = {
  restaurants: {},
  categoryFilter: '전체',
  sortFilter: 'name',

  removeRestaurant(_id: string) {
    this.restaurants = Object.fromEntries(
      Object.entries(this.restaurants).filter(([id, _]) => id !== _id),
    );

    db.setRestaurants(this.restaurants);
    this.filterRestaurants(this.categoryFilter);
    this.sortRestaurants(this.sortFilter);
  },

  addRestaurants(restaurant: Restaurant) {
    this.restaurants = { [uuid()]: restaurant, ...this.restaurants };
    db.addRestaurant(restaurant);
    this.filterRestaurants(this.categoryFilter);
    this.sortRestaurants(this.sortFilter);
  },

  filterRestaurants(categoryFilter: CategoryFilter) {
    this.categoryFilter = categoryFilter;
    this.restaurants = db.getRestaurants();
    if (categoryFilter === '전체') return;
    const filteredRestaurants = Object.fromEntries(
      Object.entries(this.restaurants).filter(
        ([_, restaurant]) => restaurant.category === categoryFilter,
      ),
    );
    this.restaurants = filteredRestaurants;
  },

  sortRestaurants(sortFilter: SortFilter) {
    this.sortFilter = sortFilter;

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
    this.restaurants = filteredRestaurants;
  },

  toggleFavoriteRestaurant(id: string) {
    this.restaurants[id].isFavorite = !this.restaurants[id].isFavorite;
    db.setRestaurants(this.restaurants);
  },

  getFavoriteRestaurants() {
    return Object.fromEntries(
      Object.entries(this.restaurants).filter(([id, restaurant]) => restaurant.isFavorite),
    );
  },
};

export default store;
