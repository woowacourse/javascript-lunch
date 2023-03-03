import RestaurantList from "../components/RestaurantList";
import RestaurantType from "../type/Restaurant";
import Restaurant from "./model/Restaurant";

class Controller {
  #restaurants: Restaurant[];

  constructor() {
    this.#restaurants = [];
    this.loadLocalStorage();
  }

  getRestaurants() {
    return this.#restaurants;
  }

  addRestaurant(newRestaurant: RestaurantType) {
    this.#restaurants = [...this.#restaurants, new Restaurant(newRestaurant)];
  }

  renderRestaurantList() {
    const restaurantList = document.getElementById("restaurantList");
    if (!(restaurantList instanceof RestaurantList)) {
      return;
    }
    restaurantList.render();
  }

  updateRestaurantList(restaurants: RestaurantType[]) {
    this.setLocalStorage(restaurants);
    this.renderRestaurantList();
  }

  setLocalStorage(restaurantsArray: RestaurantType[]) {
    const restaurants = JSON.stringify(restaurantsArray);
    localStorage.setItem("restaurants", restaurants);
  }

  loadLocalStorage() {
    this.#restaurants = this.getLocalStorage();
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem("restaurants") as string) ?? [];
  }

  sortRestaurants(key: string) {
    const sortedRestaurants = [...this.#restaurants].sort((a: any, b: any) =>
      a[key] > b[key] ? 1 : -1
    );
    this.#restaurants = sortedRestaurants;
  }

  filterRestaurants(key: string) {
    if (key !== "전체") {
      this.#restaurants = this.getLocalStorage().filter(
        (restaurant: any) => restaurant["category"] === key
      );
      return;
    }
    this.loadLocalStorage();
  }
}

export default Controller;
