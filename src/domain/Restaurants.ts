import Restaurant from './Restaurant';

type RestaurantCompareFn = (a: Restaurant, b: Restaurant) => number;

const Restaurants = {
  filterByCategory(restaurants: Restaurant[], category: string) {
    return restaurants.filter((restaurant) => restaurant.isMatchCategory(category));
  },

  byName: (a: Restaurant, b: Restaurant) => b.getName().localeCompare(a.getName()),

  byDistance: (a: Restaurant, b: Restaurant) => b.getDistanceByMinutes() - a.getDistanceByMinutes(),

  getSorted(restaurants: Restaurant[], compareFn: RestaurantCompareFn) {
    return [...restaurants].sort(compareFn);
  },
};

export default Restaurants;
