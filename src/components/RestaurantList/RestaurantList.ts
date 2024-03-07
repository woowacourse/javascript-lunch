import "./RestaurantList.css";

import BaseComponent from "../BaseComponent/BaseComponent";
import Restaurant from "../../domain/Restaurant/Restaurant";
import RestaurantItem from "../RestaurantItem/RestaurantItem";

import { RestaurantDetail } from "../../domain/Restaurant/Restaurant.type";
import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { SortCategory } from "../SortDropdown/SortDropdown.type";
import SortDropdown from "../SortDropdown/SortDropdown";

class RestaurantList extends BaseComponent {
  private restaurant = new Restaurant();

  private sortType: SortCategory = SortDropdown.SORT_CATEGORIES_TYPE.name;

  private eventListeners = {
    addRestaurant: {
      target: document,
      eventName: CUSTOM_EVENT_TYPE.addRestaurant,
      eventHandler: this.handleRerenderRestaurantList.bind(this),
    },

    sortChange: {
      target: document,
      eventName: CUSTOM_EVENT_TYPE.sortChange,
      eventHandler: this.handleSortRestaurantItems.bind(this),
    },

    filterCategory: {
      target: document,
      eventName: CUSTOM_EVENT_TYPE.filterCategory,
      eventHandler: this.handleFilterRestaurantItems.bind(this),
    },
  };

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
    const restaurantDetails = this.restaurant.getRestaurants();

    return restaurantDetails.reduce(
      (acc: string, restaurantDetail: RestaurantDetail) => {
        const restaurantItem = new RestaurantItem(restaurantDetail);

        return acc + restaurantItem.getTemplate();
      },
      ""
    );
  }

  protected setEvent(): void {
    this.on(this.eventListeners.addRestaurant);

    this.on(this.eventListeners.sortChange);

    this.on(this.eventListeners.filterCategory);
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
    this.off(this.eventListeners.addRestaurant);

    this.off(this.eventListeners.sortChange);

    this.off(this.eventListeners.filterCategory);
  }
}

customElements.define("restaurant-list", RestaurantList);
