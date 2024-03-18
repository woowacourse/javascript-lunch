import BaseComponent from "../../../BaseComponent/BaseComponent";

import Restaurant from "../../../../domain/Restaurant/Restaurant";

import { CUSTOM_EVENT_TYPE } from "../../../../constants/eventType";
import { ELEMENT_SELECTOR } from "../../../../constants/selector";

import { $ } from "../../../../utils/dom";

class RestaurantDetailModalContent extends BaseComponent {
  private eventListeners = {
    deleteRestaurantItem: {
      eventName: "click",
      eventHandler: this.handleDeleteRestaurantItem.bind(this),
    },

    rerenderModal: {
      eventName: CUSTOM_EVENT_TYPE.rerenderModal,
      eventHandler: this.handleRerenderModalContent.bind(this),
    },
  } as const;

  protected render(): void {
    const name = this.getAttribute("name") ?? "";

    const restaurantDetail = new Restaurant().getRestaurantDetailByName(name);

    this.innerHTML = `
      <div id='restaurant-detail-header'>
        <div id='restaurant-detail-category' class='restaurant__category'>
          <category-icon category='${restaurantDetail?.category}'></category-icon>
        </div>
        <star-icon name='${name}' favorite='${restaurantDetail?.isFavorite}'></star-icon>
      </div>
      <div class='restaurant__info'>
        <h3 class='restaurant__name text-subtitle'>${name}</h3>
        <span id='restaurant-detail-distance' class='text-body'>캠퍼스로부터 ${restaurantDetail?.distance}분 내</span>
        <p class='restaurant__description text-body'>${restaurantDetail?.description}</p>
      </div>
      <a target='_blank' href='${restaurantDetail?.url}' id='restaurant-detail-url'>
        <div border='0'>${restaurantDetail?.url}</div>
      </a>
      <div class='button-container'>
        <button id='modal-delete-button' type='button' class='button button--secondary text-caption'>삭제하기</button>
        <button id='modal-cancel-button' type='button' class='button button--primary text-caption'>닫기</button>
      </div>
    `;
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.deleteRestaurantItem,
      target: this,
    });

    this.on({
      ...this.eventListeners.rerenderModal,
      target: this,
    });
  }

  private handleDeleteRestaurantItem(event: Event) {
    const modalDeleteButtonElement = $(
      ELEMENT_SELECTOR.modalDeleteButton,
      this
    );

    const restaurantName = this.getAttribute("name") ?? "";

    if (event.target === modalDeleteButtonElement) {
      const restaurant = new Restaurant();

      restaurant.removeRestaurantDetail(restaurantName);

      this.emit(CUSTOM_EVENT_TYPE.rerenderRestaurantList);
      this.emit(CUSTOM_EVENT_TYPE.restaurantDetailModalClose);
    }
  }

  private handleRerenderModalContent() {
    this.connectedCallback();
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.deleteRestaurantItem,
      target: this,
    });

    this.off({
      ...this.eventListeners.rerenderModal,
      target: this,
    });
  }
}

customElements.define(
  "restaurant-detail-modal-content",
  RestaurantDetailModalContent
);
