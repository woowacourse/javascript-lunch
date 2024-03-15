import "./RestaurantTab.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

import type { RestaurantTabStatus } from "./RestaurantTab.type";
import { RESTAURANT_TAB_STATUS_TABLE } from "./RestaurantTab.constant";

import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";

class RestaurantTab extends BaseComponent {
  private tabStatus: RestaurantTabStatus = RESTAURANT_TAB_STATUS_TABLE.all;

  private eventListeners = {
    changeTab: {
      eventName: CUSTOM_EVENT_TYPE.changeTab,
      eventHandler: this.handleChangeTabStatus.bind(this),
    },
  } as const;

  public render() {
    this.innerHTML = /* html */ `
      <restaurant-tab-header
        status="${this.tabStatus}"
      ></restaurant-tab-header>
      <restaurant-tab-body
        status="${this.tabStatus}"
      ></restaurant-tab-body>
    `;
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.changeTab,
      target: document,
    });
  }

  private handleChangeTabStatus(event: Event) {
    if (event instanceof CustomEvent) {
      this.tabStatus = event.detail;

      this.connectedCallback();
    }
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.changeTab,
      target: document,
    });
  }
}

customElements.define("restaurant-tab", RestaurantTab);

export default RestaurantTab;
