import { RestaurantItem } from "../types/restaurant.types";
import LocalStorage from "./LocalStorage.ts";
import Restaurant from "./Restaurant.ts";

const STORAGE_KEY = "restaurantItem";
export const RestaurantFacade = {
  getAll(): RestaurantItem[] {
    return LocalStorage.getItems<RestaurantItem>(STORAGE_KEY);
  },

  create(data: Omit<RestaurantItem, "id">): Restaurant {
    const id = this.getLastId() + 1;
    const restaurant = new Restaurant({ ...data, id });

    const restaurants = this.getAll();
    restaurants.push(restaurant.restaurantValue);
    LocalStorage.saveItems(restaurants, STORAGE_KEY);

    return restaurant;
  },

  importData(items: Omit<RestaurantItem, "id">[]): void {
    const restaurants = this.getAll();
    let lastId = this.getLastId();

    const newRestaurants = items.map((item) => {
      lastId++;
      return { ...item, id: lastId };
    });

    LocalStorage.saveItems([...restaurants, ...newRestaurants], STORAGE_KEY);
  },

  toggleFavorite(id: number): void {
    const restaurants = this.getAll();
    const restaurant = restaurants.find((r) => r.id === id);

    if (restaurant) {
      restaurant.isFavorite = !restaurant.isFavorite;
      LocalStorage.saveItems(restaurants, STORAGE_KEY);
    }
  },

  getById(id: number): RestaurantItem | null {
    return this.getAll().find((r) => r.id === id) || null;
  },

  removeById(id: number): void {
    const restaurants = this.getAll().filter(
      (r) => Number(r.id) !== Number(id)
    );
    LocalStorage.saveItems(restaurants, STORAGE_KEY);
  },

  getLastId(): number {
    const restaurants = this.getAll();
    return restaurants.length > 0
      ? Math.max(...restaurants.map((r) => r.id))
      : 0;
  },
};
