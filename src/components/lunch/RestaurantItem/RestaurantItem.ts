import "./RestaurantItem.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

import { $ } from "../../../utils/dom";
import Restaurant from "../../../domain/Restaurant/Restaurant";
import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";

class RestaurantItem extends BaseComponent {
  private eventListeners = {
    listItemClick: {
      eventName: "click",
      eventHandler: this.handleClickItem.bind(this),
    },
  } as const;

  protected render() {
    const category = this.getAttribute("category") ?? "";
    const name = this.getAttribute("name") ?? "";
    const distance = this.getAttribute("distance") ?? "";
    const description = this.getAttribute("description") ?? "";
    const isFavorite = this.getAttribute("isFavorite") ?? "";

    this.innerHTML = `
        <div class='restaurant__category'>
          <category-icon class='category-icon' category='${category}'></category-icon>
        </div>
        <div id='restaurant-info-container'>
          <div class='restaurant__info'>
            <h3 class='restaurant__name text-subtitle'>${name}</h3>
            <span class='restaurant__distance text-body'>캠퍼스로부터 ${distance}분 내</span>
            <p class='restaurant__description text-body'>${description}</p>
          </div>
          <star-icon name='${name}' favorite='${isFavorite}'></star-icon>
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
