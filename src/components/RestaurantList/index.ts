import IRestaurant from "../../type/IRestaurant";
import RestaurantItem from "../RestaurantItem";
import Storage from "../../tools/Storage";
import defaultRestaurants from "../../tools/defaultRestaurants";
import { TCategory } from "../../type/TCategory";
import { restaurants } from "../../domain/restaurants";

class RestaurantList extends HTMLElement {
  listState: { restaurants: IRestaurant[]; filter: TCategory; sort: string };

  constructor() {
    super();
    this.listState = restaurants.create({
      restaurants: [],
      filter: "all",
      sort: "name",
    });
    this.loadRestaurants();
  }

  loadRestaurants() {
    const restaurants = Storage.loadRestaurants();
    this.listState.restaurants =
      restaurants.length > 0 ? restaurants : defaultRestaurants;
  }

  render() {
    this.innerHTML = `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
        ${this.restaurantItems(this.selectRestaurants())}
        </ul>
      </section>
    `;
  }

  selectRestaurants() {
    const { filter, sort } = this.listState;
    const restaurants =
      filter === "all"
        ? this.listState.restaurants
        : this.listState.restaurants.filter(
            (restaurant) => restaurant.category === filter
          );
    return restaurants.sort((a, b) => {
      if (sort === "name" || sort === "distance") {
        return a[sort] > b[sort] ? 1 : -1;
      }
      return 0;
    });
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
