import Restaurant from "./Restaurant";

interface Restaurants {
  restaurantList: Restaurant[];
  addRestaurant: (restaurant: Restaurant) => void;
  sortByName: () => Restaurant[];
  sortByDistance: () => Restaurant[];
}

const Restaurants: Restaurants = {
  restaurantList: [],

  addRestaurant(restaurant) {
    this.restaurantList.push(restaurant);
  },

  sortByName() {
    return this.restaurantList.sort((prev, next) =>
      prev.name > next.name ? 1 : -1
    );
  },

  sortByDistance() {
    return this.restaurantList.sort(
      (prev, next) => prev.distance - next.distance
    );
  },
};
