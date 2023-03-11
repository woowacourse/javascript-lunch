import { IRestaurant, RestaurantSortType, RestaurantCategory } from '../types';

type FilterCategory = RestaurantCategory | '전체';

export const getFilteredRestaurantsByCategory = (
  restaurants: IRestaurant[],
  category: FilterCategory
) => {
  if (category === '전체') {
    return restaurants;
  }

  return restaurants.filter((restaurant) => restaurant.category === category);
};

export const getFavoriteRestaurants = (restaurants: IRestaurant[]) => {
  return restaurants.filter((restaurant) => restaurant.isFavorite);
};

export const getSortedRestaurants = (
  filterdRestaurants: IRestaurant[],
  sortOption: RestaurantSortType
) => {
  if (sortOption === 'name') {
    return getSortedRestaurantsByName(filterdRestaurants);
  }

  return getSortedRestaurantsByDistance(filterdRestaurants);
};

export const getSortedRestaurantsByName = (restaurants: IRestaurant[]) => {
  const sortedRestaurants = restaurants.sort((restaurant1, restaurant2) => {
    return restaurant1.name.localeCompare(restaurant2.name);
  });

  return sortedRestaurants;
};

export const getSortedRestaurantsByDistance = (restaurants: IRestaurant[]) => {
  const sortedRestaurants = restaurants.sort((restaurant1, restaurant2) => {
    return Number(restaurant1.distance) - Number(restaurant2.distance);
  });

  return sortedRestaurants;
};
