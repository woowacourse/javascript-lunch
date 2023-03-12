import { Restaurant, RestaurantCategory } from '../types';

const restaurantSortType = {
  name: 'name',
  distance: 'distance',
} as const;

type RestaurantSortType = keyof typeof restaurantSortType;
type FilterCategory = RestaurantCategory | '전체';

export const getFilteredRestaurantsByCategory = (
  restaurants: Restaurant[],
  category: FilterCategory
) => {
  if (category === '전체') return restaurants;

  return restaurants.filter((restaurant) => restaurant.category === category);
};

export const getFavoriteRestaurants = (restaurants: Restaurant[]) => {
  return restaurants.filter((restaurant) => restaurant.isFavorite);
};

export const getSortedRestaurantsByName = (restaurants: Restaurant[]) => {
  const sortedRestaurants = restaurants.sort((restaurant1, restaurant2) => {
    return restaurant1.name.localeCompare(restaurant2.name);
  });

  return sortedRestaurants;
};

export const getSortedRestaurantsByDistance = (restaurants: Restaurant[]) => {
  const sortedRestaurants = restaurants.sort((restaurant1, restaurant2) => {
    return Number(restaurant1.distance) - Number(restaurant2.distance);
  });

  return sortedRestaurants;
};

const sortMethods: Record<RestaurantSortType, (restaurants: Restaurant[]) => Restaurant[]> = {
  [restaurantSortType.name]: getSortedRestaurantsByName,
  [restaurantSortType.distance]: getSortedRestaurantsByDistance,
};

export const getSortedRestaurants = (restaurants: Restaurant[], sortOption: RestaurantSortType) =>
  sortMethods[sortOption](restaurants);
