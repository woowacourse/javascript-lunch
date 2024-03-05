import "./RestaurantList.css";

import BaseComponent from "../BaseComponent/BaseComponent";
import Restaurant from "../../domain/Restaurant/Restaurant";
import RestaurantItem from "../RestaurantItem/RestaurantItem";

import { RestaurantDetail } from "../../domain/Restaurant/Restaurant.type";

class RestaurantList extends BaseComponent {
  protected render(): void {
    this.innerHTML = `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
          ${this.createRestaurantItems()}
        </ul>
      </section>
    `;
  }

  protected setEvent(): void {}

  private createRestaurantItems() {
    const restaurant = new Restaurant();

    const restaurantDetails = restaurant.getRestaurants();

    return restaurantDetails.reduce(
      (acc, restaurantDetail: RestaurantDetail) => {
        const restaurantItem = new RestaurantItem(restaurantDetail);

        return acc + restaurantItem.getTemplate();
      },
      ""
    );
  }
}

customElements.define("restaurant-list", RestaurantList);
