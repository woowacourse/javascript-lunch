import { Constants } from "@/constant/Restaurant";
import { Restaurant } from "@/type/type";
import { getSavedData, saveData, saveMockData } from "@/utils/localStorage";
import restaurantValidator from "./restaurantValidator";

class RestaurantListHandler {
  private restaurants: Restaurant[] = [];

  constructor() {
    saveMockData();
    this.restaurants = getSavedData(Constants.RESTAURANT_LIST);
  }

  getTotalRestaurants() {
    return this.restaurants;
  }

  addRestaurant(restaurant: Restaurant) {
    restaurantValidator.validate(restaurant);
    this.restaurants = [restaurant, ...this.restaurants];
    saveData(Constants.RESTAURANT_LIST, this.restaurants);
  }

  deleteRestaurant(id: string) {
    this.restaurants = this.restaurants.filter(
      (restaurant) => restaurant.id !== id
    );

    saveData(Constants.RESTAURANT_LIST, this.restaurants);
  }

  toggleBookmark(id: string) {
    this.restaurants = this.restaurants.map((restaurant) => {
      if (restaurant.id === id) {
        return { ...restaurant, bookmarked: !restaurant.bookmarked };
      }
      return restaurant;
    });

    saveData(Constants.RESTAURANT_LIST, this.restaurants);
  }
}

export default new RestaurantListHandler();
