import { Category, Restaurant } from "./types";

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

  sortByName(restaurantList: Restaurant[] = this.restaurantList) {
    return [...restaurantList].sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByDistance(restaurantList: Restaurant[] = this.restaurantList) {
    return [...restaurantList].sort((a, b) => a.distance - b.distance);
  }
}

export default RestaurantService;
