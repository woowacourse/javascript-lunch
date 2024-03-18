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

    clickRestaurantItem: {
      eventName: "click",
      eventHandler: this.handleClickRestaurantItem.bind(this),
    },

    editRestaurantItem: {
      eventName: CUSTOM_EVENT_TYPE.rerenderRestaurantList,
      eventHandler: this.handleEditRestaurantItem.bind(this),
    },
  };

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

  private handleRerenderFavoriteRestaurantList() {
    this.restaurant = new Restaurant(RestaurantStorage);
    this.connectedCallback();
  }

  private handleToggleFavoriteButton(event: Event) {
    const customEvent = event as CustomEvent;
    this.restaurant.toggleFavoriteStatus(customEvent.detail.restaurantName);

    this.handleRerenderFavoriteRestaurantList();
  }

  private handleEditRestaurantItem() {
    this.restaurant = new Restaurant(RestaurantStorage);
    this.handleRerenderFavoriteRestaurantList();
  }

  private isFavoriteButtonClick(event: Event): boolean {
    return (event.target as HTMLElement).classList.contains(
      "favorite-image-button"
    );
  }

  private handleClickRestaurantItem(event: Event) {
    const restaurantEl = (event.target as HTMLElement)?.closest(".restaurant");
    if (!restaurantEl) return;

    if (this.isFavoriteButtonClick(event)) return;

    const restaurantNameEl = restaurantEl.querySelector(".restaurant__name");
    if (!restaurantNameEl) return;

    const restaurantName = restaurantNameEl.textContent;
    if (!restaurantName) return;

    const restaurantDetail =
      this.restaurant.getRestaurantDetailByName(restaurantName);

    this.emit(CUSTOM_EVENT_TYPE.restaurantItemClick, {
      restaurantDetail: restaurantDetail,
    });
  }

  protected setEvent(): void {
    this.on({ ...this.eventListeners.toggleFavoriteButton, target: document });
    this.on({ ...this.eventListeners.clickRestaurantItem, target: document });
    this.on({ ...this.eventListeners.editRestaurantItem, target: document });
  }

  protected removeEvent(): void {
    this.off({ ...this.eventListeners.toggleFavoriteButton, target: document });
    this.off({ ...this.eventListeners.clickRestaurantItem, target: document });
    this.off({ ...this.eventListeners.editRestaurantItem, target: document });
  }
}

customElements.define("favorite-restaurant-list", FavoriteRestaurantList);

export default FavoriteRestaurantList;
