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

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  renderRestaurantItem(data: Restaurant) {
    const restaurantItem = new RestaurantItem(data).template();
    const restaurantList = $(".restaurant-list") as HTMLElement;
    restaurantList.insertAdjacentHTML("beforeend", restaurantItem);
  }

  updateRestaurantList(newData: Restaurant[]) {
    const restaurantList = $(".restaurant-list") as HTMLElement;
    restaurantList.innerHTML = "";

    newData.forEach((data) => {
      this.renderRestaurantItem(data);
    });
  }
}

export default new RestaurantList();
