import { Constants, OptionValue } from "../constant/Constants";
import { mockData } from "../data/mockData";
import { Restaurant } from "../type/type";
import { getSavedData, saveData } from "../utils/localStorage";

class RestaurantListHandler {
  restaurants: Restaurant[] = [];

  constructor() {
    // this.restaurants = getSavedData(Constants.RESTAURANT_LIST);
    this.restaurants = mockData;
  }

  addRestaurant(restaurant: Restaurant) {
    this.restaurants = [restaurant, ...this.restaurants];
    saveData(Constants.RESTAURANT_LIST, this.restaurants);
  }

  getRestaurants(): Restaurant[] {
    return [...this.restaurants];
  }

  getSortedByName(restaurants: Restaurant[] = this.restaurants): Restaurant[] {
    return [...restaurants].sort((resA, resB) =>
      resA.name.localeCompare(resB.name, Constants.KOREAN)
    );
  }

  getSortedByTakingTime(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort(
      (resA, resB) => Number(resA.takingTime) - Number(resB.takingTime)
    );
  }

  getFilteredByCategory(category: string): Restaurant[] {
    return category === OptionValue.TOTAL
      ? this.getRestaurants()
      : [...this.restaurants].filter(
          (restaurant) => restaurant.category === category
        );
  }
}

export default new RestaurantListHandler();
