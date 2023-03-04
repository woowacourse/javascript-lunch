import Restaurant from "../domain/model/Restaurant";
import RestaurantType from "../type/Restaurant";
import RestaurantItem from "./RestaurantItem";

class RestaurantList extends HTMLElement {
  state: { restaurants: RestaurantType[] };

  constructor() {
    super();
    this.state = new Proxy(
      { restaurants: [] },
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

  render() {
    this.innerHTML = `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
        ${this.state.restaurants
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

  // 새로운 모듈로 이전 예정
  setLocalStorage() {
    const restaurants = JSON.stringify(this.state.restaurants);
    localStorage.setItem("restaurants", restaurants);
  }

  loadLocalStorage() {
    this.state.restaurants = this.getLocalStorage();
  }

  // 새로운 모듈로 이전 예정
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("restaurants") as string) ?? [];
  }
}

export default RestaurantList;
