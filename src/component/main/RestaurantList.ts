import { Restaurant } from "@/type/type";
import { $ } from "@/utils/Dom";
import RestaurantItem from "../common/RestaurantItem";

class RestaurantList {
  restaurantItems: RestaurantItem[];

  constructor() {
    this.restaurantItems = [];
  }

  template() {
    return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
      ${this.restaurantItems.map((item) => item.template()).join("")}
      </ul>
    </section>`;
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  updateList(restaurants: Restaurant[]) {
    $(".restaurant-list-container")?.remove();

    this.restaurantItems = restaurants.map(
      (restaurant) => new RestaurantItem(restaurant)
    );

    this.render($("body") as Element);
  }
}

export default new RestaurantList();
