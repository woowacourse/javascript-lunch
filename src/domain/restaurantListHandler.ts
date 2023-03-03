import { Category, Restaurant } from "../type/type";

class RestaurantListHandler {
  restaurants: Restaurant[] = [];

  constructor() {
    this.restaurants = JSON.parse(
      localStorage.getItem("restuarantList") as string
    );
  }

  getRestaurants(): Restaurant[] {
    return [...this.restaurants];
  }

  addRestaurant(restaurant: Restaurant) {
    this.restaurants = [restaurant, ...this.restaurants];
  }

  getSortedByName(): Restaurant[] {
    return [...this.restaurants].sort((resA, resB) =>
      resA.name.localeCompare(resB.name, "ko-KR")
    );
  }

  getSortedByTakingTime(): Restaurant[] {
    return [...this.restaurants].sort(
      (resA, resB) => Number(resA.distance) - Number(resB.distance)
    );
  }

  getFilteredByCategory(category: string): Restaurant[] {
    return [...this.restaurants].filter(
      (restaurant) => restaurant.category === category
    );
  }
}

export default new RestaurantListHandler();
