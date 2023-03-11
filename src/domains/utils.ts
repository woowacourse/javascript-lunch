import { Restaurant, RestaurantFilter } from '../types/index';
import { CategoryOptions } from '../types/domain';
import { CATEGORY_ALL, SORT_BY_NAME } from '../constants/restaurant';

function filterByCategory(category: CategoryOptions, restaurantList: Restaurant[]) {
  if (category === CATEGORY_ALL) return [...restaurantList];

  return restaurantList.filter((restaurant) => restaurant.category === category);
}

function sortByName(restaurantList: Restaurant[]) {
  return [...restaurantList].sort((a, b) => a.name.localeCompare(b.name));
}

function sortByDistance(restaurantList: Restaurant[]) {
  return [...restaurantList].sort((a, b) => a.distance - b.distance);
}

function filterAndSort(displayStatus: RestaurantFilter, restaurantList: Restaurant[]) {
  const filteredRestaurantList = filterByCategory(displayStatus.category, restaurantList);

  if (displayStatus.sorting === SORT_BY_NAME) {
    return sortByName(filteredRestaurantList);
  }

  return sortByDistance(filteredRestaurantList);
}

export { filterAndSort };
