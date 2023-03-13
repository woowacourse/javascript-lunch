import Controller from "../domain/Controller";
import RestaurantType from "../type/Restaurant";
import { openBottomSheet } from "../utils";
import RestaurantItem from "./RestaurantItem";
import TabBar from "./TabBar";

class RestaurantList extends HTMLElement {
  private controller;

  constructor() {
    super();
    this.controller = Controller.getInstance();
    this.render();
  }

  render() {
    this.innerHTML = `
      <section id="restaurantList" class="restaurant-list-container">
        <ul class="restaurant-list">
        ${this.controller
          .getRestaurants()
          .map((restaurant: RestaurantType) =>
            new RestaurantItem().render(restaurant)
          )
          .join("")}
        </ul>
      </section>
    `;
    this.onClickRestaurantItem();
    this.onToggleFavorite();
  }

  onClickRestaurantItem() {
    const restaurantItems = this.querySelectorAll("#restaurantInfo");

    restaurantItems.forEach((restaurantItem, index) => {
      restaurantItem.addEventListener("click", () => {
        this.controller.setSelectedRestaurantIndex(index);
        openBottomSheet("<restaurant-detail />");
      });
    });
  }

  onToggleFavorite() {
    const favorites = this.querySelectorAll("#favorite");

    favorites.forEach((favorite, index) => {
      favorite.addEventListener("click", () => {
        this.controller.setSelectedRestaurantIndex(index);
        this.controller.toggleFavorite();

        if (TabBar.getCurrentTab() === "favorite") {
          this.controller.setFavoriteRestaurantList();
          return;
        }
        this.controller.loadLocalStorage();
      });
    });
  }
}

export default RestaurantList;
