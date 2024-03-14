import "../../common/CommonModal/CommonModal.css";
import "./LunchApp.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

import { ELEMENT_SELECTOR } from "../../../constants/selector";
import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";

class LunchApp extends BaseComponent {
  protected render() {
    this.innerHTML = `
          <global-navigation-bar></global-navigation-bar>
          <main>
            <restaurant-tab class='restaurant-filter-container'></restaurant-tab>
          </main>
          <common-modal
            id="restaurant-add-modal"
            targetSelector="${ELEMENT_SELECTOR.restaurantAddModal}"  
            open="${CUSTOM_EVENT_TYPE.restaurantAddModalOpen}"
            close="${CUSTOM_EVENT_TYPE.restaurantAddModalClose}"
          >
            <h2 class='modal-title text-title'>새로운 음식점</h2>
            <restaurant-add-form></restaurant-add-form>
          </common-modal>
          <restaurant-detail-modal></restaurant-detail-modal>
        `;
  }
}

customElements.define("lunch-app", LunchApp);
