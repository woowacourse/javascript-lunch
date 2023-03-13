import type { Restaurant } from "../types/type";
import { $ } from "../utils/Dom";
import RestaurantItem from "../components/common/RestaurantItem";
import restaurantListHandler from "../domain/restaurantListHandler";

class RestaurantList {
  template() {
    return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
      </ul>
    </section>`;
  }

  initialize(
    target: Element,
    restaurants: Restaurant[],
    onSelectRestaurantID: (id: string) => void,
    rerenderList: () => void
  ) {
    this.render(target, restaurants);
    this.addEvent(onSelectRestaurantID, rerenderList);
  }

  addEvent(
    onSelectRestaurantID: (id: string) => void,
    rerenderList: () => void
  ) {
    const restaurantListContainer = <HTMLElement>$(".restaurant-list");
    restaurantListContainer?.addEventListener("click", (event) => {
      const target = <HTMLElement>event.target;
      const id = <string>target.closest("li")?.dataset.id;
      const bookmarkButton = <HTMLElement>(
        target.closest(".restaurant__bookmark")
      );

      if (bookmarkButton) {
        restaurantListHandler.toggleBookmark(id);
        rerenderList();
        return;
      }

      onSelectRestaurantID(id);
      $(".item-sheet")?.classList.add("modal--open");
    });
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
