import IRestaurant from "../../type/IRestaurant";
import RestaurantItem from "../RestaurantItem";
import Storage from "../../tools/Storage";
import defaultRestaurants from "../../tools/defaultRestaurants";
import { TCategory } from "../../type/TCategory";
import { restaurants } from "../../domain/restaurants";
import { restoreRestaurants, selectRestaurants } from "./handleRestaurantList";

class RestaurantList extends HTMLElement {
  listState: { restaurants: IRestaurant[]; filter: TCategory; sort: string };

  constructor() {
    super();
    this.listState = restaurants.create({
      restaurants: [],
      filter: "all",
      sort: "name",
    });
    restoreRestaurants();
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
    this.listState.filter = key;
  }

  sortBy(key: string) {
    this.listState.sort = key;
  }
}

export default RestaurantList;
