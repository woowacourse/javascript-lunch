import { Constants, OptionValue } from "@/constant/Restaurant";
import { Category, Restaurant, Sort } from "@/type/type";
import { getSavedData, saveData } from "@/utils/localStorage";

class RestaurantListHandler {
  private restaurants: Restaurant[] = [];

  constructor() {
    this.restaurants = getSavedData(Constants.RESTAURANT_LIST);
  }

  addRestaurant(restaurant: Restaurant) {
    this.restaurants = [restaurant, ...this.restaurants];
    saveData(Constants.RESTAURANT_LIST, this.restaurants);
  }

  getTotalRestaurants() {
    return this.restaurants;
  }

  getRestaurants(category: Category, sort: Sort): Restaurant[] {
    const restaurants = this.getFilteredByCategory(category);

    return sort === OptionValue.NAME_ORDER
      ? this.getSortedByName(restaurants)
      : this.getSortedByTakingTime(restaurants);
  }

  getBookmarkedRestaurants() {
    return this.restaurants.filter((restaurant) => restaurant.bookmarked);
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

  private getSortedByName(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((resA, resB) =>
      resA.name.localeCompare(resB.name, Constants.KOREAN)
    );
  }

  private getSortedByTakingTime(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort(
      (resA, resB) => resA.takingTime - resB.takingTime
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
