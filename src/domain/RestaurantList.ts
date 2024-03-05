import { Restaurant, Category } from "../types";

class RestaurantList {
  private restaurants: Restaurant[];

  constructor(restaurants: Restaurant[]) {
    this.restaurants = restaurants;
  }

  getRestaurants(): Restaurant[] {
    return [...this.restaurants];
  }

  getFilteredRestaurants(category: Category): Restaurant[] {
    return this.restaurants.filter(
      (restaurant) => restaurant.category === category
    );
  }
}

export default RestaurantList;
