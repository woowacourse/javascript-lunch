import Restaurant, { Category } from "./Restaurant";

interface Restaurants {
  restaurantList: Restaurant[];
  addRestaurant: (restaurant: Restaurant) => void;
  filterByCategory: (category: Category) => Restaurant[];
  sortByName: () => Restaurant[];
  sortByDistance: () => Restaurant[];
}

const Restaurants: Restaurants = {
  restaurantList: [],

  addRestaurant(restaurant) {
    this.restaurantList.push(restaurant);
  },

  filterByCategory(category) {
    return this.restaurantList.filter(
      (restaurant) => restaurant.category === category
    );
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
