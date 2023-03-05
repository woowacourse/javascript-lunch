import { Constants, OptionValue } from "@/constant/Constants";
import { mockData } from "@/data/mockData";
import { Category, Restaurant, Sort } from "@/type/type";
import { getSavedData, saveData } from "@/utils/localStorage";

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

  getRestaurants(category: Category, sort: Sort): Restaurant[] {
    const restaurants = this.getFilteredByCategory(category);

    return sort === OptionValue.NAME_ORDER
      ? this.getSortedByName(restaurants)
      : this.getSortedByTakingTime(restaurants);
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

  getFilteredByCategory(category: Category): Restaurant[] {
    return category === OptionValue.TOTAL
      ? [...this.restaurants]
      : [...this.restaurants].filter(
          (restaurant) => restaurant.category === category
        );
  }
}

export default new RestaurantListHandler();
