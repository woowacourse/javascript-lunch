import BaseComponent from "../BaseComponent/BaseComponent";
import Restaurant from "../../domain/Restaurant/Restaurant";
import RestaurantItem from "../RestaurantItem/RestaurantItem";

import { RestaurantDetail } from "../../domain/Restaurant/Restaurant.type";
import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";

import { CustomEventListenerDictionary } from "../BaseComponent/BaseComponent.type";

import RestaurantStorage from "../../storages/RestaurantStorage";

class FavoriteRestaurantList extends BaseComponent {
  private restaurant = new Restaurant(RestaurantStorage);

  private eventListeners: CustomEventListenerDictionary = {
    toggleFavoriteButton: {
      eventName: CUSTOM_EVENT_TYPE.toggleFavoriteButton,
      eventHandler: this.handleToggleFavoriteButton.bind(this),
    },
  };

  private handleToggleFavoriteButton(event: Event) {
    const customEvent = event as CustomEvent;
    this.restaurant.toggleFavoriteStatus(customEvent.detail.restaurantName);

    this.handleRerenderRestaurantList();
  }

  protected render(): void {
    this.innerHTML = `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
          ${this.createFavoriteRestaurantItems()}
        </ul> 
      </section>
    `;
  }

  private createFavoriteRestaurantItems() {
    const restaurantDetails = this.restaurant.getRestaurantDetails();

    return restaurantDetails
      .filter((restaurantDetail: RestaurantDetail) => restaurantDetail.favorite)
      .reduce((acc: string, restaurantDetail: RestaurantDetail) => {
        const restaurantItem = new RestaurantItem(restaurantDetail);

        return acc + restaurantItem.getTemplate();
      }, "");
  }

  private handleRerenderRestaurantList() {
    this.connectedCallback();
  }

  protected setEvent(): void {
    this.on({ ...this.eventListeners.toggleFavoriteButton, target: document });
  }

  protected removeEvent(): void {
    this.off({ ...this.eventListeners.toggleFavoriteButton, target: document });
  }
}

customElements.define("favorite-restaurant-list", FavoriteRestaurantList);

export default FavoriteRestaurantList;
