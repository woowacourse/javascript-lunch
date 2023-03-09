import RestaurantList from "../components/RestaurantList";
import { ALL_CATEGORY, SORT_FAILED_NUMBER } from "../constants";
import RestaurantType from "../type/Restaurant";

class Controller {
  private static instance: Controller;
  private selectedRestaurantIndex = -1;
  state: { restaurants: RestaurantType[] };

  constructor() {
    this.state = new Proxy(
      { restaurants: [] },
      {
        set: (obj, prop, value) => {
          if (prop === "restaurants") {
            obj[prop] = value;
          }
          this.renderRestaurantList();
          return true;
        },
      }
    );
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

  renderRestaurantList() {
    const restaurantList = document.getElementById("restaurantList");
    if (!(restaurantList instanceof RestaurantList)) {
      return;
    }
    restaurantList.render();
  }

  setFavoriteRestaurantList() {
    this.state.restaurants = [...this.state.restaurants].filter(
      (restaurant) => {
        if (restaurant.isFavorite) return restaurant;
      }
    );
  }

  addRestaurant(newRestaurant: RestaurantType) {
    this.state.restaurants = [...this.getLocalStorage(), newRestaurant];
    this.setLocalStorage();
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem("restaurants") as string) ?? [];
  }

  setLocalStorage() {
    const restaurants = JSON.stringify(this.state.restaurants);
    localStorage.setItem("restaurants", restaurants);
  }

  loadLocalStorage() {
    this.state.restaurants = this.getLocalStorage();
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

  toggleFavorite(index: number) {
    this.state.restaurants[index].isFavorite =
      !this.state.restaurants[index].isFavorite;
    this.setFavoriteRestaurantList();
  }

  setSelectedRestaurantIndex(index: number) {
    this.selectedRestaurantIndex = index;
  }

  getSelectedRestaurant() {
    return this.state.restaurants[this.selectedRestaurantIndex];
  }
}

export default Controller;
