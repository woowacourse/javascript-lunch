import Header from "./UI/Header.js";
import Modal from "./UI/Modal";
import FilterBar from "./UI/FilterBar";
import RestaurantList from "./domain/RestaurantList";
import RestaurantContainer from "./UI/RestaurantContainer.js";
import RestaurantItem from "./UI/RestaurantItem.js";

export class App {
  constructor() {
    this.restaurantList = new RestaurantList();
    this.restaurantItem = new RestaurantItem();
    new Header();
    new FilterBar(this.restaurantList, this.restaurantItem);
    new RestaurantContainer();
    new Modal(this.restaurantList, this.restaurantItem);

    const restaurants = JSON.parse(localStorage.getItem("restaurants"));
    if (restaurants !== null)
      JSON.parse(localStorage.getItem("restaurants")).forEach((restaurant) => {
        this.restaurantItem.render(restaurant);
      });
  }
}
