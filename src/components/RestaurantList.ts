import Controller from "../domain/Controller";
import RestaurantItem from "./RestaurantItem";

class RestaurantList extends HTMLElement {
  private controller;

  constructor() {
    super();
    this.controller = Controller.getInstance();
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
        ${this.controller
          .getRestaurants()
          .map((restaurant) => new RestaurantItem().render(restaurant))
          .join("")}
        </ul>
      </section>
    `;
  }
}

export default RestaurantList;
