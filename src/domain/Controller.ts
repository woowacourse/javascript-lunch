import RestaurantList from "../components/RestaurantList";
import { ALL_CATEGORY } from "../constants";
import RestaurantType from "../type/Restaurant";

class Controller {
  private static instance: Controller;
  state: { restaurants: RestaurantType[] };

  constructor() {
    this.state = new Proxy(
      { restaurants: [] },
      {
        set: (obj: any, prop, value) => {
          obj[prop] = value;
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

  renderRestaurantList() {
    const restaurantList = document.getElementById("restaurantList");
    if (!(restaurantList instanceof RestaurantList)) {
      return;
    }
    restaurantList.render();
  }

  getRestaurants() {
    return this.state.restaurants;
  }

  addRestaurant(newRestaurant: RestaurantType) {
    this.state.restaurants = [...this.state.restaurants, newRestaurant];
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

  sortRestaurants(key: string) {
    const sortedRestaurants = [...this.state.restaurants].sort(
      (a: any, b: any) => (a[key] > b[key] ? 1 : -1)
    );
    this.state.restaurants = sortedRestaurants;
  }

  filterRestaurants(key: string) {
    if (key !== ALL_CATEGORY) {
      this.state.restaurants = this.getLocalStorage().filter(
        (restaurant: RestaurantType) => restaurant.category === key
      );
      return;
    }
    this.loadLocalStorage();
  }
}

export default Controller;
