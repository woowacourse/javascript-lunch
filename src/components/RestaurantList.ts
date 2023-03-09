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
          .map((restaurant, index) =>
            new RestaurantItem().render(restaurant, index)
          )
          .join("")}
        </ul>
      </section>
    `;
    this.onClickRestaurantItem();
    this.onToggleFavorite();
  }

  onClickRestaurantItem() {
    const restaurantItems = this.querySelectorAll("#restaurantItem");

    restaurantItems.forEach((restaurantItem) => {
      restaurantItem.addEventListener("click", () => {
        this.controller.setSelectedRestaurantIndex(
          Number(restaurantItem.getAttribute("key"))
        );
      });
    });
  }
}

export default RestaurantList;
