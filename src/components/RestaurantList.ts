import Restaurant from "../domain/model/Restaurant";
import RestaurantType from "../type/Restaurant";
import RestaurantItem from "./RestaurantItem";

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
    this.state.restaurants = this.getLocalStorage();
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
    this.state.restaurants = [
      ...this.state.restaurants,
      new Restaurant(newRestaurant),
    ];
    this.setLocalStorage();
  }

  filterBy(key: string) {
    this.state.filter = key;
  }

  sortBy(key: string) {
    this.state.sort = key;
  }

  // 새로운 모듈로 이전 예정
  setLocalStorage() {
    const restaurants = JSON.stringify(this.state.restaurants);
    localStorage.setItem("restaurants", restaurants);
  }

  // 새로운 모듈로 이전 예정
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("restaurants") as string) ?? [];
  }
}

export default RestaurantList;
