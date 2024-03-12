import "./RestaurantList.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

import Restaurant from "../../../domain/Restaurant/Restaurant";
import { RestaurantDetail } from "../../../domain/Restaurant/Restaurant.type";
import RestaurantItem from "../RestaurantItem/RestaurantItem";

import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";
import { SORT_CATEGORIES_TYPE } from "../../../constants/sortCategory/sortCategory";
import type { SortCategory } from "../../../constants/sortCategory/sortCategory.type";

import RestaurantStorage from "../../../storages/RestaurantStorage";

class RestaurantList extends BaseComponent {
  private restaurant = new Restaurant(RestaurantStorage);

  private sortType: SortCategory = SORT_CATEGORIES_TYPE.name;

  private eventListeners = {
    addRestaurant: {
      eventName: CUSTOM_EVENT_TYPE.addRestaurant,
      eventHandler: this.handleRerenderRestaurantList.bind(this),
    },

    sortChange: {
      eventName: CUSTOM_EVENT_TYPE.sortChange,
      eventHandler: this.handleSortRestaurantItems.bind(this),
    },

    filterCategory: {
      eventName: CUSTOM_EVENT_TYPE.filterCategory,
      eventHandler: this.handleFilterRestaurantItems.bind(this),
    },

    deleteRestaurantItem: {
      eventName: CUSTOM_EVENT_TYPE.deleteRestaurantItem,
      eventHandler: this.handleRerenderRestaurantList.bind(this),
    },
  } as const;

  protected render(): void {
    this.innerHTML = `
      <section class="restaurant-list-container">
        <ul class="restaurant-list">
          ${this.createRestaurantItems()}
        </ul> 
      </section>
    `;
  }

  private createRestaurantItems() {
    const restaurantDetails = this.restaurant.getRestaurantDetails();

    return restaurantDetails.reduce(
      (acc: string, restaurantDetail: RestaurantDetail) => {
        const restaurantItem = new RestaurantItem(restaurantDetail);

        return (
          acc +
          `<restaurant-item class="restaurant">${restaurantItem.getTemplate()}</restaurant-item>`
        );
      },
      ""
    );
  }

  protected setEvent(): void {
    this.on({ ...this.eventListeners.addRestaurant, target: document });

    this.on({ ...this.eventListeners.sortChange, target: document });

    this.on({ ...this.eventListeners.filterCategory, target: document });

    this.on({ ...this.eventListeners.deleteRestaurantItem, target: document });
  }

  private handleRerenderRestaurantList() {
    this.restaurant.updateRestaurants(this.sortType);

    this.connectedCallback();
  }

  private handleSortRestaurantItems(event: Event) {
    if (event instanceof CustomEvent) {
      const sortType = event.detail;

      this.sortType = sortType;

      this.restaurant.sortRestaurants(sortType);

      this.connectedCallback();
    }
  }

  private handleFilterRestaurantItems(event: Event) {
    if (event instanceof CustomEvent) {
      const filterType = event.detail;

      this.restaurant.filterRestaurants(filterType, this.sortType);

      this.connectedCallback();
    }
  }

  protected removeEvent(): void {
    this.off({ ...this.eventListeners.addRestaurant, target: document });

    this.off({ ...this.eventListeners.sortChange, target: document });

    this.off({ ...this.eventListeners.filterCategory, target: document });

    this.off({ ...this.eventListeners.deleteRestaurantItem, target: document });
  }
}

customElements.define("restaurant-list", RestaurantList);
