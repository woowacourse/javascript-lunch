import type Restaurant from './Restaurant';

export type RestaurantFilter = (restaurants: Restaurant[]) => Restaurant[];

const sortBy =
  (compareFn: (a: Restaurant, b: Restaurant) => number): RestaurantFilter =>
  (restaurants) => {
    return restaurants.sort(compareFn);
  };

const RestaurantFilters = {
  filterBy:
    (filterFn: (restaurant: Restaurant) => boolean): RestaurantFilter =>
    (restauraunts) =>
      restauraunts.filter(filterFn),

  sortBy,

  sortByName: sortBy((a, b) => a.getName().localeCompare(b.getName())),

  sortByDistance: sortBy((a, b) => a.getDistance() - b.getDistance()),
};

export default RestaurantFilters;
