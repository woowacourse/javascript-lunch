import { Restaurant, RestaurantFilter, CategoryOptions } from '../types/types';

function filterByCategory(category: CategoryOptions, restaurantList: Restaurant[]) {
  if (category === '전체') return [...restaurantList];

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

  if (displayStatus.sorting === '이름순') {
    return sortByName(filteredRestaurantList);
  }

  return sortByDistance(filteredRestaurantList);
}

export { filterAndSort };
