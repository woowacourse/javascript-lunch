import Controller from "../domain/Controller";
import BottomSheet from "./BottomSheet";
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
        const bottomSheet = document.getElementById("bottomSheet");
        if (!(bottomSheet instanceof BottomSheet)) {
          return;
        }
        bottomSheet.open("<restaurant-detail />");
      });
    });
  }

  onToggleFavorite() {
    const favorites = this.querySelectorAll("#favorite");

    favorites.forEach((favorite: any) => {
      favorite.addEventListener("click", () => {
        this.controller.toggleFavorite(
          Number(favorite.parentElement.getAttribute("key"))
        );
        this.render();
      });
    });
  }
}

export default RestaurantList;
