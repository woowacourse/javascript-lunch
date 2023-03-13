import Restaurant from './Restaurant';

type RestaurantCompareFn = (a: Restaurant, b: Restaurant) => number;

const Restaurants = {
  filterByCategory(restaurants: Restaurant[], category: string) {
    return restaurants.filter((restaurant) => restaurant.isMatchCategory(category));
  },

  byName: (a: Restaurant, b: Restaurant) => a.getName().localeCompare(b.getName()),

  byDistance: (a: Restaurant, b: Restaurant) => a.getDistanceByMinutes() - b.getDistanceByMinutes(),

  getSorted(restaurants: Restaurant[], compareFn: RestaurantCompareFn) {
    return [...restaurants].sort(compareFn);
  },

  getAll: (_restaurants: Restaurant[]) => _restaurants,

  getFavorite: (_restaurants: Restaurant[]) => {
    return _restaurants.filter((restaurant) => restaurant.getIsFavorite());
  },
};

export default Restaurants;
