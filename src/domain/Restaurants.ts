import Restaurant from './Restaurant';
import { TCategory } from '../type/types';

const Restaurants = {
  addRestaurant(restaurant: Restaurant) {
    const restaurants = localStorage.getItem('restaurants');

    if (restaurants) {
      localStorage.setItem('restaurants', JSON.stringify([...JSON.parse(restaurants), restaurant]));
    } else {
      localStorage.setItem('restaurants', JSON.stringify([restaurant]));
    }
  },

  getRestaurants() {
    const restaurants = localStorage.getItem('restaurants');
    return restaurants ? restaurants : [];
  },

  getFilteredByCategory(restaurants: Restaurant[], category: TCategory) {
    return restaurants.filter((restaurant) => restaurant.category === category);
  },

  getSortedByName(restaurants: Restaurant[]) {
    return [...restaurants.sort((a, b) => a.name.localeCompare(b.name))];
  },

  getSortedByDistance(restaurants: Restaurant[]) {
    return [...restaurants.sort((a, b) => a.distance - b.distance)];
  },
};

export default Restaurants;
