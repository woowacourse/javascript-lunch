import { Restaurant } from "../../types/type";
import { $ } from "../../utils/Dom";
import RestaurantItem from "../reusable/RestaurantItem";

class RestaurantList {
  template() {
    return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
      </ul>
    </section>`;
  }

  initialize(target: Element) {
    this.render(target);
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  renderRestaurantItem(data: Restaurant) {
    const restaurantItem = new RestaurantItem(data).template();
    const restaurantList = <HTMLElement>$(".restaurant-list");
    restaurantList.insertAdjacentHTML("beforeend", restaurantItem);
  }

  updateRestaurantList(newData: Restaurant[]) {
    const restaurantList = <HTMLElement>$(".restaurant-list");
    this.removeTemplate(restaurantList);

    newData.forEach((data) => {
      this.renderRestaurantItem(data);
    });
  }

  removeTemplate(target: Element) {
    while (target?.firstChild) {
      target.removeChild(target.firstChild);
    }
  }
}

export default new RestaurantList();
