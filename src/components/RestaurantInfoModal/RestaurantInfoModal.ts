import BaseComponent from "../BaseComponent/BaseComponent";
import type { CustomEventListenerDictionary } from "../BaseComponent/BaseComponent.type";

import Restaurant from "../../domain/Restaurant/Restaurant";
import RestaurantStorage from "../../storages/RestaurantStorage";

import RestaurantInfoItem from "./RestaurantInfoItem";

import { $ } from "../../utils/dom";
import { getModalTemplate } from "../../utils/modal/modalTemplate";

import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { ELEMENT_SELECTOR } from "../../constants/selector";
import { RestaurantDetail } from "../../domain/Restaurant/Restaurant.type";

class RestaurantInfoModal extends BaseComponent {
  private restaurant = new Restaurant(RestaurantStorage);
  private restaurantInfoItem: RestaurantInfoItem | null = null;

  private eventListeners: CustomEventListenerDictionary = {
    modalCancelButtonClick: {
      eventName: "click",
      eventHandler: this.handleCancelButton.bind(this),
    },

    restaurantItemDeleteButtonClick: {
      eventName: "click",
      eventHandler: this.handleDeleteRestaurantInfoButton.bind(this),
    },

    restaurantItemClick: {
      eventName: CUSTOM_EVENT_TYPE.restaurantItemClick,
      eventHandler: this.handleRestaurantItemClick.bind(this),
    },

    toggleFavoriteButton: {
      eventName: CUSTOM_EVENT_TYPE.toggleFavoriteButton,
      eventHandler: this.handleToggleFavoriteButton.bind(this),
    },
  };

  protected render(): void {
    this.innerHTML = getModalTemplate(`${this.restaurantInfoItem?.getTemplate()}
      <div class="button-container">
        <button id="restaurant-delete-button" type="button" class="button button--secondary text-caption">삭제하기</button>
        <button id="info-modal-cancel-button" type="button" class="button button--primary text-caption">닫기</button>
      </div>
    `);
  }

  constructor() {
    super();
  }

  private handleDeleteRestaurantInfoButton() {
    this.handleCloseModal();

    this.restaurant.updateRestaurantsDetails();

    const restaurantName = this.restaurantInfoItem?.getRestaurantDetail().name;
    if (restaurantName) {
      this.restaurant.deleteRestaurantByName(restaurantName);
    }

    this.emit(CUSTOM_EVENT_TYPE.rerenderRestaurantList);
  }

  private handleToggleFavoriteButton(event: Event) {
    const customEvent = event as CustomEvent;

    this.restaurant.updateRestaurantsDetails();

    this.restaurant.toggleFavoriteStatus(customEvent.detail.restaurantName);

    this.restaurantInfoItem = new RestaurantInfoItem(
      this.restaurant.getRestaurantDetailByName(
        customEvent.detail.restaurantName
      ) as RestaurantDetail
    );

    this.connectedCallback();
    this.emit(CUSTOM_EVENT_TYPE.rerenderRestaurantList);
  }

  private handleRestaurantItemClick(event: Event) {
    const customEvent = event as CustomEvent;

    this.restaurantInfoItem = new RestaurantInfoItem(
      customEvent.detail.restaurantDetail
    );

    this.connectedCallback();
    this.handleOpenModal();
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.modalCancelButtonClick,
      target: $(`#info-modal-cancel-button`),
    });

    this.on({
      ...this.eventListeners.restaurantItemClick,
      target: document,
    });

    this.on({
      ...this.eventListeners.toggleFavoriteButton,
      target: this,
    });

    this.on({
      ...this.eventListeners.restaurantItemDeleteButtonClick,
      target: $(`#restaurant-delete-button`),
    });
  }

  private handleCancelButton() {
    this.handleCloseModal();
  }

  private handleCloseModal() {
    this.classList.remove("modal--open");
  }

  private handleOpenModal() {
    this.classList.add("modal--open");
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.modalCancelButtonClick,
      target: $(ELEMENT_SELECTOR.modalCancelButton),
    });

    this.off({
      ...this.eventListeners.restaurantItemClick,
      target: document,
    });

    this.off({
      ...this.eventListeners.toggleFavoriteButton,
      target: this,
    });
  }
}

customElements.define("restaurant-info-modal", RestaurantInfoModal);

export default RestaurantInfoModal;
