import { Constants, OptionValue } from "@/constant/Constants";
import { mockData } from "@/data/mockData";
import { Category, Restaurant, Sort } from "@/type/type";
import { getSavedData, saveData } from "@/utils/localStorage";

class RestaurantListHandler {
  private restaurants: Restaurant[] = [];

  constructor() {
    // this.restaurants = getSavedData(Constants.RESTAURANT_LIST);
    this.restaurants = mockData;
  }

  validateRestaurant(restaurant: Restaurant) {
    if (!this.isNameValid(restaurant.name)) {
      throw new Error("이름이 유효하지 않습니다.");
    }
    if (!this.isRestaurantNew(restaurant.category, restaurant.name)) {
      throw new Error("이미 존재하는 식당입니다.");
    }
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

  private getSortedByName(
    restaurants: Restaurant[] = this.restaurants
  ): Restaurant[] {
    return [...restaurants].sort((resA, resB) =>
      resA.name.localeCompare(resB.name, Constants.KOREAN)
    );
  }

  private getSortedByTakingTime(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort(
      (resA, resB) => resA.takingTime - resB.takingTime
    );
  }

  private getFilteredByCategory(category: Category): Restaurant[] {
    return category === OptionValue.TOTAL
      ? [...this.restaurants]
      : [...this.restaurants].filter(
          (restaurant) => restaurant.category === category
        );
  }

  private isRestaurantNew(category: Category, name: string) {
    return this.getFilteredByCategory(category).every(
      (restaurant) => restaurant.name !== name
    );
  }

  private isNameValid(name: string) {
    return Boolean(name.trim());
  }
}

export default new RestaurantListHandler();
