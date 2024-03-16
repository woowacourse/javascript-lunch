import { Category, Option, Restaurant } from './types';

export const filterByBookmark = (restaurants: Restaurant[], isBookmark: boolean) => {
  if (isBookmark) {
    return restaurants.filter((restaurant) => restaurant.isBookmark);
  }
  return restaurants;
};

export const filterByCategory = (restaurants: Restaurant[], category: Category) => {
  if (category === '전체') {
    return restaurants;
  }
  return restaurants.filter((restaurant) => restaurant.category === category);
};

export const sortByOption = (restaurants: Restaurant[], sort: Option) => {
  if (sort === 'name') {
    return restaurants.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort === 'distance') {
    return restaurants.sort((a, b) => a.distance - b.distance);
  }
  return restaurants;
};
