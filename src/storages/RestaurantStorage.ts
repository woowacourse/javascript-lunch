import { Restaurant } from "../../types";
import { LocalStorage } from "./Storage";

export default class RestaurantStorage {
  private static readonly RESTAURANTS_KEY = "restaurants";
  private storage: LocalStorage = new LocalStorage();

  getRestaurants(): Restaurant[] {
    return (
      this.storage.get<Restaurant[]>(RestaurantStorage.RESTAURANTS_KEY) ?? []
    );
  }

  setRestaurants(restaurants: Restaurant[]): void {
    return this.storage.set<Restaurant[]>(
      RestaurantStorage.RESTAURANTS_KEY,
      restaurants
    );
  }

  removeRestaurants(): void {
    this.storage.remove(RestaurantStorage.RESTAURANTS_KEY);
  }

  clearRestaurants(): void {
    this.storage.clear();
  }
}
