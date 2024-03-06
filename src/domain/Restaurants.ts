import Restaurant from './Restaurant';
import { IRestaurant, TCategory, TSortingOption } from '../type/types';

function getRestaurants() {
  const restaurants = localStorage.getItem('restaurants');
  return restaurants ? JSON.parse(restaurants) : [];
}

function getFilteredByCategory(restaurants: Restaurant[], category: TCategory) {
  return category === '전체' ? restaurants : restaurants.filter((restaurant) => restaurant.category === category);
}

function getSortedByName(restaurants: Restaurant[]) {
  return [...restaurants.sort((a, b) => a.name.localeCompare(b.name))];
}

function getSortedByDistance(restaurants: Restaurant[]) {
  return [...restaurants.sort((a, b) => a.distance - b.distance)];
}

const Restaurants = {
  addRestaurant(restaurant: IRestaurant) {
    const restaurants = localStorage.getItem('restaurants');

    if (restaurants) {
      localStorage.setItem('restaurants', JSON.stringify([...JSON.parse(restaurants), new Restaurant(restaurant)]));
    } else {
      localStorage.setItem('restaurants', JSON.stringify([new Restaurant(restaurant)]));
    }
  },

  transformRestaurants(category: TCategory, sortingOption: TSortingOption) {
    const restaurants = getRestaurants();
    const filteredRestaurants = getFilteredByCategory(restaurants, category);

    return sortingOption === '이름순' ? getSortedByName(filteredRestaurants) : getSortedByDistance(filteredRestaurants);
  },
};

export default Restaurants;
