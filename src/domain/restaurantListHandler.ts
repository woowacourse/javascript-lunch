import { Constants } from "../utils/Constants";
import { Restaurant } from "../types/type";
import { getSavedData, saveData } from "../utils/localStorage";

class RestaurantListHandler {
  restaurants: Restaurant[] = [];

  constructor() {
    this.restaurants = getSavedData(Constants.RESTAURANT_LIST);
  }

  addRestaurant(restaurant: Restaurant) {
    this.restaurants = [restaurant, ...this.restaurants];
    saveData(Constants.RESTAURANT_LIST, this.restaurants);
  }

  getRestaurants(): Restaurant[] {
    return this.restaurants;
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
    return this.getRestaurants().filter(
      (restaurant) => restaurant.category === category
    );
  }

  getSelectedItem(id: string, restaurantList: Restaurant[]) {
    return restaurantList.find((restaurant) => restaurant.id === id);
  }

  setDeleteItem(id: string, restaurantList: Restaurant[]) {
    this.restaurants = restaurantList.filter(
      (restaurant) => restaurant.id !== id
    );

    saveData(Constants.RESTAURANT_LIST, this.restaurants);

    return this.restaurants;
  }
}

export default new RestaurantListHandler();
