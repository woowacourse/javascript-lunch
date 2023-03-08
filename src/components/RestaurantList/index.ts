import IRestaurant from "../../type/IRestaurant";
import RestaurantItem from "../RestaurantItem";
import { TCategory } from "../../type/TCategory";
import { restaurants } from "../../domain/restaurants";
import { selectRestaurants } from "./handleRestaurantList";

class RestaurantList extends HTMLElement {
  constructor() {
    super();
  }
  ping() {
    return "hi";
  }

  render() {
    this.innerHTML = `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
        ${this.restaurantItems(selectRestaurants())}
        </ul>
      </section>
    `;
  }

  restaurantItems(selectedRestaurants: IRestaurant[]) {
    return selectedRestaurants
      .map((restaurant) => RestaurantItem(restaurant))
      .join("");
  }

  filterBy(key: TCategory) {
    restaurants.state.filter = key;
  }

  sortBy(key: string) {
    restaurants.state.sort = key;
  }
}

export default RestaurantList;
