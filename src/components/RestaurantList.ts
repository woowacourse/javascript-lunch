import Controller from "../domain/Controller";
import RestaurantType from "../type/Restaurant";
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
          .map((restaurant: RestaurantType, index: number) =>
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
    const restaurantItems = this.querySelectorAll("#restaurantInfo");

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
        this.controller.setSelectedRestaurantIndex(
          Number(favorite.parentElement.getAttribute("key"))
        );
        this.controller.toggleFavorite();
        const currentTab = document.querySelector('input[name="tab"]:checked');
        if (!(currentTab instanceof HTMLInputElement)) {
          return;
        }
        if (currentTab.value === "favorite") {
          this.controller.setFavoriteRestaurantList();
          return;
        }
        this.render();
      });
    });
  }
}

export default RestaurantList;
