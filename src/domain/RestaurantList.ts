import sortLetters from "../utils/sortLetters";
import Category from "./type/Category";
import Restaurant from "./type/Restaurant";

class RestaurantList {
  #restaurants: Map<string, Restaurant> = new Map();

  add(restaurant: Restaurant) {
    if (this.#restaurants.get(restaurant.name)) {
      throw new Error("name 중복");
    }
    this.#restaurants.set(restaurant.name, restaurant);
    return this;
  }

  delete(name: string) {
    if (this.#restaurants.get(name) === undefined) {
      throw new Error("name 없음");
    }
    this.#restaurants.delete(name);
  }

  getAscendingByName() {
    const restaurants = this.getRestaurants();
    return restaurants.sort((a, b) => sortLetters(a.name, b.name));
  }

  getAscendingByDistance() {
    const restaurants = this.getRestaurants();
    return restaurants.sort((a, b) => a.distance - b.distance);
  }

  filterByCategory(category: Category) {
    const restaurants = this.getRestaurants();
    return restaurants.filter((restaurant) => restaurant.category === category);
  }

  getRestaurants() {
    return Array.from(this.#restaurants.values());
  }
}

export default RestaurantList;
