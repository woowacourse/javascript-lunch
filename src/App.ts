import Header from "./UI/Header";
import Modal from "./UI/Modal";
import FilterBar from "./UI/FilterBar";
import RestaurantList from "./domain/RestaurantList";
import RestaurantContainer from "./UI/RestaurantContainer.js";
import RestaurantItem from "./UI/RestaurantItem";
import { RestaurantForm } from "./domain/Restaurant.js";

export class App {
  private restaurantList = new RestaurantList();
  private restaurantItem = new RestaurantItem();

  constructor() {
    new Header();
    new FilterBar(this.restaurantList, this.restaurantItem);
    new RestaurantContainer();
    new Modal(this.restaurantList, this.restaurantItem);

    const restaurants = JSON.parse(localStorage.getItem("restaurants") || "[]");
    if (restaurants !== null)
      JSON.parse(localStorage.getItem("restaurants") || "[]").forEach(
        (restaurant: RestaurantForm) => {
          this.restaurantItem.render(restaurant);
        }
      );
  }
}
