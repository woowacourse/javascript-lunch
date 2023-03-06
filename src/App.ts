import Header from "./UI/Header";
import Modal from "./UI/Modal";
import FilterBar from "./UI/FilterBar";
import RestaurantList from "./domain/RestaurantList";
import RestaurantContainer from "./UI/RestaurantContainer";
import RestaurantItem from "./UI/RestaurantItem";
import { RestaurantForm } from "./types";
import { sortByDistance, sortByName } from "./utils/Sort";
import { getLocalStorage } from "./utils/LocalStorage";
import { KEY } from "./constants";
import { $ } from "./utils/Dom";

export class App {
  private restaurantList = new RestaurantList();
  private restaurantItem = new RestaurantItem();

  constructor() {
    new Header();
    new FilterBar(this.restaurantList, this.restaurantItem);
    new RestaurantContainer();
    new Modal(this.restaurantList, this.restaurantItem);

    this.init();
  }

  init() {
    const restaurants = getLocalStorage(KEY);
    this.sortRestaurants(restaurants);
    if (restaurants !== null)
      restaurants.forEach((restaurant: RestaurantForm) => {
        this.restaurantItem.render(restaurant);
      });
  }

  sortRestaurants(restaurants: RestaurantForm[]) {
    const sorted = $("#sorting-filter") as HTMLSelectElement;
    const sortedValue = sorted.options[sorted.selectedIndex].value;
    if (sortedValue === "name") sortByName(restaurants);
    if (sortedValue === "distance") sortByDistance(restaurants);
  }
}
