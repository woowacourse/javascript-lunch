import AppController from "@/AppDataController";
import restaurantListHandler from "@/domain/restaurantListHandler";
import { Restaurant } from "@/type/type";
import { $ } from "@/utils/Dom";
import Render from "@/view/Render";
import RestaurantItem from "../common/RestaurantItem";

class RestaurantList {
  listEl!: HTMLElement;

  template() {
    return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
      </ul>
    </section>`;
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
    this.listEl = <HTMLElement>$(".restaurant-list");
  }

  updateList(restaurants: Restaurant[]) {
    this.emptyList();

    const restaurantItemTemplate = restaurants
      .map((restaurant) => new RestaurantItem(restaurant).template())
      .join("");

    this.listEl.insertAdjacentHTML("beforeend", restaurantItemTemplate);
  }

  emptyList() {
    while (this.listEl.firstChild) {
      this.listEl.firstChild?.remove();
    }
  }

  addEvent() {
    this.listEl.addEventListener("click", (e) => {
      const target = <HTMLElement>e.target;
      const restaurantId = <string>target.closest("li")?.dataset.id;

      if (target.className === "bookmark") {
        restaurantListHandler.toggleBookmark(restaurantId);
        const restaurantList = AppController.getRestaurantList();
        Render.updateRestaurantList(restaurantList);
        return;
      }

      const restaurant = <Restaurant>AppController.getRestaurant(restaurantId);
      Render.openItemModal(restaurant);
    });
  }
}

export default new RestaurantList();
