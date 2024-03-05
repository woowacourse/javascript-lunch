import { Restaurant, Category } from "../types";
import { deepCopy } from "../util";
class RestaurantList {
  private restaurants: Restaurant[];

  constructor(restaurants: Restaurant[]) {
    this.restaurants = restaurants.map((restaurant) => deepCopy(restaurant));
  }

  getRestaurants(): Restaurant[] {
    return this.restaurants.map((restaurant) => deepCopy(restaurant));
  }

  getFilteredRestaurants(category: Category): Restaurant[] {
    return this.restaurants
      .map((restaurant) => deepCopy(restaurant))
      .filter((restaurant) => restaurant.category === category);
  }

  getSortedRestaurants(standard: "name" | "distance") {
    return this.restaurants
      .map((restaurants) => deepCopy(restaurants))
      .sort((a, b) => {
        if (a[standard] < b[standard]) {
          return -1;
        } else if (a[standard] < b[standard]) {
          return 1;
        }
        return 0;
      });
  }

  add(restaurant: Restaurant) {
    this.restaurants = [...this.restaurants, deepCopy(restaurant)];
  }
}

export default RestaurantList;
