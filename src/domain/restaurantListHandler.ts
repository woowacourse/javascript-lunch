import { Constants, OptionValue } from "@/constant/Restaurant";
import { mockData } from "@/data/mockData";
import { Category, Restaurant, Sort } from "@/type/type";
import { getSavedData, saveData } from "@/utils/localStorage";

class RestaurantListHandler {
  private restaurants: Restaurant[] = [];

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

  deleteRestaurant(id: string) {
    this.restaurants = this.restaurants.filter(
      (restaurant) => restaurant.id !== id
    );
  }

  toggleBookmark(id: string) {
    this.restaurants = this.restaurants.map((restaurant) => {
      if (restaurant.id === id) {
        return { ...restaurant, bookmarked: !restaurant.bookmarked };
      }
      return restaurant;
    });
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
