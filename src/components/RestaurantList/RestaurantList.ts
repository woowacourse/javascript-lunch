import "./RestaurantList.css";

import BaseComponent from "../BaseComponent/BaseComponent";
import Restaurant from "../../domain/Restaurant/Restaurant";
import RestaurantItem from "../RestaurantItem/RestaurantItem";

import { RestaurantDetail } from "../../domain/Restaurant/Restaurant.type";
import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";

class RestaurantList extends BaseComponent {
  private restaurant = new Restaurant();

  protected render(): void {
    this.innerHTML = `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
          ${this.createRestaurantItems()}
        </ul>
      </section>
    `;
  }

  protected setEvent(): void {
    this.on({
      target: document,
      eventName: CUSTOM_EVENT_TYPE.addRestaurant,
      eventHandler: () => {
        this.restaurant.updateRestaurants();
        this.connectedCallback();
      },
    });

    this.on({
      target: document,
      eventName: CUSTOM_EVENT_TYPE.sortChange,
      eventHandler: this.handleSortRestaurantItems.bind(this),
    });
  }

  private handleSortRestaurantItems(event: Event) {
    if (event instanceof CustomEvent) {
      const sortType = event.detail;

      this.restaurant.sortRestaurants(sortType);
      this.connectedCallback();
    }
  }

  private createRestaurantItems() {
    const restaurantDetails = this.restaurant.getRestaurants();

    return restaurantDetails.reduce(
      (acc: string, restaurantDetail: RestaurantDetail) => {
        const restaurantItem = new RestaurantItem(restaurantDetail);

        return acc + restaurantItem.getTemplate();
      },
      ""
    );
  }
}

customElements.define("restaurant-list", RestaurantList);
