import { Restaurant, Category, DEFAULT, SortingKey } from '../types/types';

const KEY = 'restaurant';

const restaurantAPI = {
  save: (restaurant: Restaurant) => {
    const json = window.localStorage.getItem(KEY);
    const existingRestaurants = json ? JSON.parse(json) : [];
    window.localStorage.setItem(KEY, JSON.stringify([...existingRestaurants, restaurant]));
  },

  load: (category = DEFAULT.category, sortingKey = DEFAULT.sortingKey) => {
    const json = window.localStorage.getItem(KEY);
    const list = json ? JSON.parse(json) : [];
    const filteredList = filterByCategory(list, category);
    const sortedList = sortBySortingKey(filteredList, sortingKey);
    return sortedList;
  }
};

const filterByCategory = (list: Restaurant[], category: Category) => {
  if (category === DEFAULT.category) return [...list];
  return [...list].filter((restaurant: Restaurant) => restaurant.category === category);
};

// FIXME
const sortingKeyToProperty: { [K in SortingKey]: keyof Restaurant } = {
  이름순: 'name',
  거리순: 'distance'
};

const sortBySortingKey = (list: Restaurant[], sortingKey: SortingKey): Restaurant[] => {
  const propertyKey = sortingKeyToProperty[sortingKey];

  return list.sort((a: Restaurant, b: Restaurant) => {
    if (a[propertyKey] < b[propertyKey]) return -1;
    if (a[propertyKey] > b[propertyKey]) return 1;
    return 0;
  });
};

export default restaurantAPI;
