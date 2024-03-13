import "./RestaurantItem.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

import type { RestaurantDetail } from "../../../domain/Restaurant/Restaurant.type";

import { $ } from "../../../utils/dom";
import Restaurant from "../../../domain/Restaurant/Restaurant";
import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";

class RestaurantItem extends BaseComponent {
  private restaurantDetail: RestaurantDetail;

  private eventListeners = {
    listItemClick: {
      eventName: "click",
      eventHandler: this.handleClickItem.bind(this),
    },
  } as const;

  constructor(restaurantDetail: RestaurantDetail) {
    super();

    this.restaurantDetail = restaurantDetail;
  }

  public getTemplate() {
    return `
        <div class='restaurant__category'>
          <category-icon class='category-icon' category='${this.restaurantDetail.category}'></category-icon>
        </div>
        <div id='restaurant-info-container'>
          <div class='restaurant__info'>
            <h3 class='restaurant__name text-subtitle'>${this.restaurantDetail.name}</h3>
            <span class='restaurant__distance text-body'>캠퍼스로부터 ${this.restaurantDetail.distance}분 내</span>
            <p class='restaurant__description text-body'>${this.restaurantDetail.description}</p>
          </div>
          <star-icon name='${this.restaurantDetail.name}' favorite='${this.restaurantDetail.isFavorite}'></star-icon>
        </div>
    `;
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.listItemClick,
      target: this,
    });
  }

  private handleClickItem(event: Event) {
    if (event.currentTarget instanceof HTMLElement) {
      const restaurantName = $("h3", event.currentTarget)
        ?.textContent as string;

      const restaurantDetail = new Restaurant().getRestaurantDetailByName(
        restaurantName
      );

      this.emit(CUSTOM_EVENT_TYPE.restaurantDetailModalOpen, restaurantDetail);
    }
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.listItemClick,
      target: this,
    });
  }
}

customElements.define("restaurant-item", RestaurantItem);

export default RestaurantItem;
