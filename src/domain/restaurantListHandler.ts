import { Constants } from "../constant/Constants";
import { Restaurant } from "../type/type";

class RestaurantListHandler {
  restaurants: Restaurant[] = [];

  constructor() {
    this.restaurants = JSON.parse(
      localStorage.getItem(Constants.RESTAURANT_LIST) as string
    );
  }

  addRestaurant(restaurant: Restaurant) {
    this.restaurants = [restaurant, ...this.restaurants];
    localStorage.setItem(
      Constants.RESTAURANT_LIST,
      JSON.stringify(this.restaurants)
    );
  }

  getRestaurants(): Restaurant[] {
    return [...this.restaurants];
  }

  getSortedByName(): Restaurant[] {
    return [...this.restaurants].sort((resA, resB) =>
      resA.name.localeCompare(resB.name, Constants.KOREAN)
    );
  }

  getSortedByTakingTime(): Restaurant[] {
    return [...this.restaurants].sort(
      (resA, resB) => Number(resA.distance) - Number(resB.distance)
    );
  }

  getFilteredByCategory(category: string): Restaurant[] {
    return category === ""
      ? [...this.restaurants]
      : [...this.restaurants].filter(
          (restaurant) => restaurant.category === category
        );
  }
}

export default new RestaurantListHandler();
