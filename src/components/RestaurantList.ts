import RestaurantType from "../type/Restaurant";
import RestaurantItem from "./RestaurantItem";
import LocalStorage from "../tools/LocalStorage";
import defaultRestaurants from "../tools/defaultRestaurants";

class RestaurantList extends HTMLElement {
  state: { restaurants: RestaurantType[]; filter: string; sort: string };

  constructor() {
    super();
    this.state = new Proxy(
      { restaurants: [], filter: "전체", sort: "name" },
      {
        set: (obj: any, prop, value) => {
          obj[prop] = value;
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
        ${JSON.stringify(this.state)}
        <ul class="restaurant-list">
        ${this.state.restaurants
          .filter(
            (restaurant) =>
              this.state.filter === "전체" ||
              restaurant.category === this.state.filter
          )
          .sort((a: any, b: any) =>
            a[this.state.sort] > b[this.state.sort] ? 1 : -1
          )
          .map((restaurant) => new RestaurantItem().render(restaurant))
          .join("")}
        </ul>
      </section>
    `;
  }

  addRestaurant(newRestaurant: RestaurantType) {
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
