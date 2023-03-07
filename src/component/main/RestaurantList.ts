import { Restaurant } from "@/type/type";
import { $ } from "@/utils/Dom";
import RestaurantItem from "../common/RestaurantItem";

class RestaurantList {
  template() {
    return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list" />
    </section>`;
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  renderRestaurantItem(restaurant: Restaurant) {
    const restaurantItem = new RestaurantItem(restaurant);

    const list = $(".restaurant-list");
    list?.insertAdjacentHTML("beforeend", restaurantItem.template());
  }

  updateList(restaurants: Restaurant[]) {
    const list = $(".restaurant-list");
    list?.replaceChildren();

    restaurants.forEach((restaurant) => {
      this.renderRestaurantItem(restaurant);
    });
  }
}

export default new RestaurantList();
