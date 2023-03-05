import Restaurant from "../type/Restaurant";
import RestaurantItem from "./RestaurantItem";
import LocalStorage from "../tools/LocalStorage";
import defaultRestaurants from "../tools/defaultRestaurants";

class RestaurantList extends HTMLElement {
  state: { restaurants: Restaurant[]; filter: string; sort: string };

  constructor() {
    super();
    this.state = new Proxy(
      { restaurants: [], filter: "전체", sort: "name" },
      {
        set: (obj, prop: string, value) => {
          //type-guard
          if (prop === "restaurants" || prop === "filter" || prop === "sort") {
            obj[prop] = value;
          }
          this.render();
          return true;
        },
      }
    );
    this.loadLocalStorage();
  }

  loadLocalStorage() {
    const restaurants = LocalStorage.getLocalStorage("restaurants");
    this.state.restaurants =
      restaurants.length > 0 ? restaurants : defaultRestaurants;
  }

  render() {
    this.innerHTML = `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
        ${this.state.restaurants
          .filter(
            (restaurant) =>
              this.state.filter === "전체" ||
              restaurant.category === this.state.filter
          )
          .sort((a: Restaurant, b: Restaurant) => {
            if (this.state.sort === "name" || this.state.sort === "distance") {
              return a[this.state.sort] > b[this.state.sort] ? 1 : -1;
            }
            return 0;
          })
          .map((restaurant) => RestaurantItem(restaurant))
          .join("")}
        </ul>
      </section>
    `;
  }

  addRestaurant(newRestaurant: Restaurant) {
    this.state.restaurants = [...this.state.restaurants, newRestaurant];
    LocalStorage.setLocalStorage("restaurants", this.state.restaurants);
  }

  filterBy(key: string) {
    this.state.filter = key;
  }

  sortBy(key: string) {
    this.state.sort = key;
  }
}

export default RestaurantList;
