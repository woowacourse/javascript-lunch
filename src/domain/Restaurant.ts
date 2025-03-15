import { Category, Distance, RestaurantItem } from "../types/restaurant.types";

export default class Restaurant {
  #id: number;
  #storeName: string;
  #distance: Distance;
  #category: Category;
  #description: string;
  #link: string;
  #isFavorite: boolean = false;

  constructor({
    id,
    storeName,
    distance,
    category,
    description = "",
    link = "",
    isFavorite = false,
  }: RestaurantItem) {
    this.#id = id;
    this.#storeName = storeName;
    this.#distance = distance;
    this.#category = category;
    this.#description = description;
    this.#link = link;
    this.#isFavorite = isFavorite;
  }

  save() {
    const restaurants = Restaurant.restaurantLocalStorage;
    restaurants.push(this.restaurantValue);
    Restaurant.updateLocalStorage(restaurants);
  }

  static toggleFavorite(id: number) {
    const restaurants = Restaurant.restaurantLocalStorage;
    const restaurant = restaurants.find((r) => r.id === id);

    if (restaurant) {
      restaurant.isFavorite = !restaurant.isFavorite;
      Restaurant.updateLocalStorage(restaurants);
    }
  }

  static get restaurantLocalStorage(): RestaurantItem[] {
    const storedData = localStorage.getItem("restaurantItem");
    return storedData ? JSON.parse(storedData) : [];
  }

  static getItemById(id: number) {
    return Restaurant.restaurantLocalStorage.find((r) => r.id === id) || null;
  }

  static getLastRestaurantId(): number {
    const restaurants = Restaurant.restaurantLocalStorage;
    return restaurants.length > 0
      ? Math.max(...restaurants.map((r) => r.id))
      : 0;
  }

  static removeItemById(id: number) {
    const restaurants = Restaurant.restaurantLocalStorage.filter(
      (r) => r.id !== id
    );
    Restaurant.updateLocalStorage(restaurants);
  }

  static updateLocalStorage(restaurants: RestaurantItem[]) {
    localStorage.setItem("restaurantItem", JSON.stringify(restaurants));
  }

  get restaurantValue(): RestaurantItem {
    return {
      id: this.#id,
      storeName: this.#storeName,
      distance: this.#distance,
      category: this.#category,
      description: this.#description,
      link: this.#link,
      isFavorite: this.#isFavorite,
    };
  }
}
