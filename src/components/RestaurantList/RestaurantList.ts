import "./RestaurantList.css";

import BaseComponent from "../BaseComponent/BaseComponent";
import Restaurant from "../../domain/Restaurant/Restaurant";
import RestaurantItem from "../RestaurantItem/RestaurantItem";

import { RestaurantDetail } from "../../domain/Restaurant/Restaurant.type";
import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { SortCategory } from "../SortDropdown/SortDropdown.type";

import { CustomEventListenerDictionary } from "../BaseComponent/BaseComponent.type";
import { SORT_CATEGORIES_TYPE } from "../../constants/sortCategory/sortCategory";

import RestaurantStorage from "../../storages/RestaurantStorage";

class RestaurantList extends BaseComponent {
  private restaurant = new Restaurant(RestaurantStorage);
  private restaurantItems: RestaurantItem[] = [];

  private sortType: SortCategory = SORT_CATEGORIES_TYPE.name;

  private eventListeners: CustomEventListenerDictionary = {
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
        this.restaurantItems.push(restaurantItem);

        return acc + restaurantItem.getTemplate();
      },
      ""
    );
  }

  private handleToggleFavoriteButton(event: Event) {
    const customEvent = event as CustomEvent;
    this.restaurant.toggleFavoriteStatus(customEvent.detail.restaurantName);
  }

  private handleEditRestaurantItem() {
    this.restaurant = new Restaurant(RestaurantStorage);
    this.handleRerenderRestaurantList();
  }

  private handleClickRestaurantItem(event: Event) {
    const restaurantEl = (event.target as HTMLElement)?.closest(".restaurant");

    if (!restaurantEl) return;

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

  private handleRerenderRestaurantList() {
    this.restaurant.updateRestaurantsSortType(this.sortType);

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

  protected setEvent(): void {
    this.on({ ...this.eventListeners.addRestaurant, target: document });
    this.on({ ...this.eventListeners.sortChange, target: document });
    this.on({ ...this.eventListeners.filterCategory, target: document });
    this.on({ ...this.eventListeners.toggleFavoriteButton, target: this });
    this.on({ ...this.eventListeners.clickRestaurantItem, target: this });
    this.on({ ...this.eventListeners.editRestaurantItem, target: document });
  }

  protected removeEvent(): void {
    this.off({ ...this.eventListeners.addRestaurant, target: document });
    this.off({ ...this.eventListeners.sortChange, target: document });
    this.off({ ...this.eventListeners.filterCategory, target: document });
    this.off({ ...this.eventListeners.toggleFavoriteButton, target: document });
    this.off({ ...this.eventListeners.clickRestaurantItem, target: this });
    this.off({ ...this.eventListeners.editRestaurantItem, target: document });
  }
}

customElements.define("restaurant-list", RestaurantList);

export default RestaurantList;
