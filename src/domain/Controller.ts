import CategorySelectBox from "../components/CategorySelectBox";
import RestaurantList from "../components/RestaurantList";
import SortingSelectBox from "../components/SortingSelectBox";
import { ALL_CATEGORY, SORT_FAILED_NUMBER } from "../constants";
import RestaurantType from "../type/Restaurant";

class Controller {
  private static instance: Controller;
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

  addRestaurant(newRestaurant: RestaurantType) {
    this.state.restaurants = [...this.getLocalStorage(), newRestaurant];
    this.setLocalStorage();
    this.filterRestaurants();
    this.sortRestaurants();
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

  sortRestaurants() {
    const sortingKey = SortingSelectBox.getOption();

    const sortedRestaurants = [...this.state.restaurants].sort(
      (a: RestaurantType, b: RestaurantType): number => {
        if (sortingKey === "name" || sortingKey === "distance")
          return a[sortingKey] > b[sortingKey] ? 1 : -1;
        return SORT_FAILED_NUMBER;
      }
    );
    this.state.restaurants = sortedRestaurants;
  }

  filterRestaurants() {
    const filteringKey = CategorySelectBox.getOption();

    if (filteringKey !== ALL_CATEGORY) {
      this.state.restaurants = this.getLocalStorage().filter(
        (restaurant: RestaurantType) => restaurant.category === filteringKey
      );
      this.sortRestaurants();
      return;
    }

    this.loadLocalStorage();
  }
}

export default Controller;
