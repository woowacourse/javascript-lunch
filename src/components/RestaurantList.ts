import { Restaurant } from "../types/type";
import { $ } from "../utils/Dom";
import RestaurantItem from "../components/common/RestaurantItem";

class RestaurantList {
  template() {
    return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
      </ul>
    </section>`;
  }

  initialize(target: Element, restaurants: Restaurant[]) {
    this.render(target, restaurants);
  }

  renderList(target: Element, restaurants: Restaurant[]) {
    target.insertAdjacentHTML(
      "beforeend",
      restaurants
        .map((restaurant) => new RestaurantItem(restaurant).template())
        .join("")
    );
  }

  render(target: Element, restaurants: Restaurant[]) {
    target.insertAdjacentHTML("beforeend", this.template());

    const restaurantList = <HTMLElement>$(".restaurant-list");
    this.renderList(restaurantList, restaurants);
  }

  updateRestaurantList(restaurants: Restaurant[]) {
    const restaurantList = <HTMLElement>$(".restaurant-list");

    this.removeTemplate(restaurantList);
    this.renderList(restaurantList, restaurants);
  }

  removeTemplate(target: Element) {
    while (target?.firstChild) {
      target.removeChild(target.firstChild);
    }
  }
}

export default new RestaurantList();
