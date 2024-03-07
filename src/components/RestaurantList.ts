import BaseComponent from "../abstract/BaseComponent";
import RestaurantItem from "./RestaurantItem";
import Restaurants from "../domain/Restaurants";
import Restaurant, { RestaurantInfo } from "../domain/Restaurant";
import FilterBar from "./FilterBar";

customElements.define("restaurant-item", RestaurantItem);
customElements.define("filter-bar", FilterBar);

export default class RestaurantList extends BaseComponent {
  // private restaurants: Restaurants;

  protected getTemplate(): string {
    const restaurants = new Restaurants([
      new Restaurant({
        name: "test",
        category: "korean",
        timeToReach: 10,
        description: "test",
        link: "test",
      }),
    ]).getDetails();

    return `
    <div>
      <filter-bar></filter-bar>
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
          ${restaurants.map(
            ({
              name,
              category,
              timeToReach,
              description,
              link,
            }: RestaurantInfo) =>
              `<restaurant-item name="${name}" category="${category}" timeToReach=${timeToReach} description=${description} link=${link}>
            </restaurant-item>`
          )}
        </ul>
      </section>
    </div>
    `;
  }

  static get observedAttributes() {
    return ["restaurants"];
  }
}
