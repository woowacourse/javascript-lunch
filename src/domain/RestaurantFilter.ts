import Restaurant from './Restaurant';

export type RestaurantFilter = (restaurants: Restaurant[]) => Restaurant[];

export const filterBy: (filterFn: (restaurant: Restaurant) => boolean) => RestaurantFilter =
  (filterFn) => (restauraunts) => {
    return restauraunts.filter(filterFn);
  };

export const sortBy: (compareFn: (a: Restaurant, b: Restaurant) => number) => RestaurantFilter =
  (compareFn) => (restaurants) => {
    return restaurants.sort(compareFn);
  };

export const sortByName = sortBy((a, b) => a.getName().localeCompare(b.getName()));

export const sortByDistance = sortBy((a, b) => a.getDistance() - b.getDistance());
