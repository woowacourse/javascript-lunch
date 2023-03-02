import { Category, Restaurant } from "../type/type";

class RestaurantListHandler {
  restaurants: Restaurant[] = [];

  addRestaurant(restaurant: Restaurant) {
    this.restaurants.push(restaurant);
  }

  getSortedByName(): Restaurant[] {
    return [...this.restaurants].sort((resA, resB) =>
      resA.name.localeCompare(resB.name, "ko-KR")
    );
  }

  getSortedByTakingTime(): Restaurant[] {
    return [...this.restaurants].sort(
      (resA, resB) => resA.distance - resB.distance
    );
  }

  getFilteredByCategory(category: Category): Restaurant[] {
    return [...this.restaurants].filter(
      (restaurant) => restaurant.category === category
    );
  }
}

export default new RestaurantListHandler();
