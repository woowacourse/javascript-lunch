import Restaurant from './Restaurant';

export type RestaurantFilter = (restaurants: Restaurant[]) => Restaurant[];

export const filterBy: <T>(getterFn: (restaurant: Restaurant) => T, value: T) => RestaurantFilter =
  (getterFn, value) => (restauraunts) => {
    return restauraunts.filter((restaurant) => getterFn(restaurant) === value);
  };

export const sortBy: (compareFn: (a: Restaurant, b: Restaurant) => number) => RestaurantFilter =
  (compareFn) => (restaurants) => {
    return restaurants.sort(compareFn);
  };

export const sortByName = sortBy((a, b) => a.getName().localeCompare(b.getName()));

export const sortByDistance = sortBy((a, b) => a.getDistanceByMinutes() - b.getDistanceByMinutes());
