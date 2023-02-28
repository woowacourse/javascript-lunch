import { Category, Restaurant } from "./types";
import { sortWordsAscending, sortNumbersAscending } from "../utils/sorter";

class RestaurantService {
  private restaurantList: Restaurant[] = [];

  add(restaurant: Restaurant) {
    this.restaurantList.push(restaurant);
  }

  filter(category: Category) {
    return this.restaurantList.filter(
      (restaurant) => restaurant.category === category
    );
  }

  sort(criterion: string) {
    if (criterion === "name") {
      return [...this.restaurantList].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    return [...this.restaurantList].sort((a, b) => a.distance - b.distance);
  }
}

export default RestaurantService;
