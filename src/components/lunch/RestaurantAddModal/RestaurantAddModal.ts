import "../RestaurantDetailModal/RestaurantDetailModal.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";
import { ELEMENT_SELECTOR } from "../../../constants/selector";

class RestaurantAddModal extends BaseComponent {
  protected render(): void {
    this.innerHTML = `
        <common-modal
            id="restaurant-add-modal"
            targetSelector="${ELEMENT_SELECTOR.restaurantAddModal}"  
            open="${CUSTOM_EVENT_TYPE.restaurantAddModalOpen}"
            close="${CUSTOM_EVENT_TYPE.restaurantAddModalClose}"
        >
            <h2 class='modal-title text-title'>새로운 음식점</h2>
            <restaurant-add-form></restaurant-add-form>
        </common-modal>
    `;
  }
}

customElements.define("restaurant-add-modal", RestaurantAddModal);
