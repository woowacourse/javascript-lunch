import "../RestaurantDetailModal/RestaurantDetailModal.css";

import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";
import { ELEMENT_SELECTOR } from "../../../constants/selector";
import { RestaurantDetail } from "../../../domain/Restaurant/Restaurant.type";
import BaseComponent from "../../BaseComponent/BaseComponent";
import { $ } from "../../../utils/dom";

class RestaurantDetailModal extends BaseComponent {
  private restaurantDetail: RestaurantDetail | null = null;

  private eventListeners = {
    restaurantDetailModalOpen: {
      eventName: CUSTOM_EVENT_TYPE.restaurantDetailModalOpen,
      eventHandler: this.handleOpenRestaurantDetailModal.bind(this),
    },

    restaurantDetailModalClose: {
      eventName: "click" as keyof HTMLElementEventMap,
      eventHandler: this.handleCloseRestaurantDetailModal.bind(this),
    },
  };

  protected render(): void {
    this.innerHTML = `
      <common-modal
        open="${CUSTOM_EVENT_TYPE.restaurantDetailModalOpen}"
        close="${CUSTOM_EVENT_TYPE.restaurantDetailModalClose}"
        targetSelector="${ELEMENT_SELECTOR.restaurantDetailModal}"  
        children="${
          this.restaurantDetail
            ? `<div id='restaurant-detail-header'>
                <div id='restaurant-detail-category' class='restaurant__category'>
                  <category-icon category='${
                    this.restaurantDetail.category
                  }'></category-icon>
                </div>
                  <star-icon favorite='${String(false)}' ${
                this.restaurantDetail.category
              }'></star-icon>
                </div>
                <div class='restaurant__info'>
                  <h3 class='restaurant__name text-subtitle'>${
                    this.restaurantDetail.name
                  }</h3>
                  <span id='restaurant-detail-distance' class='text-body'>캠퍼스로부터 ${
                    this.restaurantDetail.distance
                  }분 내</span>
                  <p class='restaurant__description text-body'>${
                    this.restaurantDetail.description
                  }</p>
                </div>
                <a target='_blank' href='${
                  this.restaurantDetail.url
                }' id='restaurant-detail-url'><div border='0'>${
                this.restaurantDetail.url
              }</div></a>
                <div class='button-container'>
                  <button type='button' class='button button--secondary text-caption'>삭제하기</button>
                  <button id='modal-cancel-button' type='button' class='button button--primary text-caption'>닫기</button>
                </div>`
            : ""
        }" 
        id="restaurant-detail-modal">
      </common-modal>
    `;
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.restaurantDetailModalOpen,
      target: document,
    });

    this.on({
      ...this.eventListeners.restaurantDetailModalClose,
      target: this,
    });
  }

  private handleOpenRestaurantDetailModal(event: Event) {
    if (event instanceof CustomEvent) {
      this.restaurantDetail = event.detail;

      this.connectedCallback();
    }
  }

  private handleCloseRestaurantDetailModal(event: Event) {
    const modalCancelButtonElement = $(
      ELEMENT_SELECTOR.modalCancelButton,
      this
    );

    if (event.target === modalCancelButtonElement) {
      this.emit(CUSTOM_EVENT_TYPE.restaurantDetailModalClose);
    }
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.restaurantDetailModalOpen,
      target: document,
    });

    this.off({
      ...this.eventListeners.restaurantDetailModalClose,
      target: this,
    });
  }
}

customElements.define("restaurant-detail-modal", RestaurantDetailModal);
