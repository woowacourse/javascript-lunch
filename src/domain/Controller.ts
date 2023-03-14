import RestaurantType from "../type/Restaurant";
import { restaurants } from "./restaurants";
import {
  ALL_CATEGORY,
  NOT_SELECTED_INDEX,
  SORT_FAILED_NUMBER,
} from "../constants";

class Controller {
  private static instance: Controller;
  private selectedRestaurantIndex = NOT_SELECTED_INDEX;
  state: { restaurants: RestaurantType[] };

  constructor() {
    this.state = restaurants.state;
    this.loadLocalStorage();
  }

  static getInstance() {
    if (!Controller.instance) {
      Controller.instance = new Controller();
    }

    return Controller.instance;
  }

  getRestaurants() {
    return this.state.restaurants;
  }

  getSelectedRestaurantIndex() {
    return this.selectedRestaurantIndex;
  }

  getSelectedRestaurant() {
    return this.state.restaurants[this.selectedRestaurantIndex];
  }

  setSelectedRestaurantIndex(index: number) {
    this.selectedRestaurantIndex = index;
  }

  setFavoriteRestaurantList() {
    this.state.restaurants = this.getLocalStorage().filter(
      (restaurant: RestaurantType) => {
        if (restaurant.isFavorite) return restaurant;
      }
    );
  }

  addRestaurant(newRestaurant: RestaurantType) {
    this.setLocalStorage([...this.getLocalStorage(), newRestaurant]);
  }

  loadLocalStorage() {
    this.state.restaurants = this.getLocalStorage();
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem("restaurants") as string) ?? [];
  }

  setLocalStorage(newRestaurants: RestaurantType[]) {
    localStorage.setItem("restaurants", JSON.stringify(newRestaurants));
  }

  sortRestaurants(sortingKey: string) {
    this.state.restaurants = [...this.state.restaurants].sort(
      (a: RestaurantType, b: RestaurantType): number => {
        if (sortingKey === "name" || sortingKey === "distance")
          return a[sortingKey] > b[sortingKey] ? 1 : -1;
        return SORT_FAILED_NUMBER;
      }
    );
  }

  filterRestaurants(filteringKey: string) {
    if (filteringKey !== ALL_CATEGORY) {
      this.state.restaurants = this.getLocalStorage().filter(
        (restaurant: RestaurantType) => restaurant.category === filteringKey
      );
      return;
    }

    this.loadLocalStorage();
  }

  toggleFavorite() {
    const restaurants = this.getLocalStorage();
    restaurants.forEach((restaurant: RestaurantType, targetIndex: number) => {
      if (
        JSON.stringify(restaurant) ==
        JSON.stringify(this.getSelectedRestaurant())
      )
        restaurants[targetIndex].isFavorite =
          !restaurants[targetIndex].isFavorite;
    });

    this.setLocalStorage(restaurants);

    this.getSelectedRestaurant().isFavorite =
      !this.getSelectedRestaurant().isFavorite;
  }

  deleteRestaurant() {
    const restaurants = this.getLocalStorage();
    const newRestaurants = restaurants.filter(
      (restaurant: RestaurantType) =>
        JSON.stringify(restaurant) !=
        JSON.stringify(this.getSelectedRestaurant())
    );

    this.setLocalStorage(newRestaurants);
  }
}

export default Controller;
