import "./RestaurantTab.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

import type { RestaurantTabStatus } from "./RestaurantTab.type";
import { RESTAURANT_TAB_STATUS_TABLE } from "./RestaurantTab.constant";

import { MENU_CATEGORIES } from "../../../constants/menuCategory/menuCategory";
import { SORT_CATEGORIES_TYPE } from "../../../constants/sortCategory/sortCategory";
import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";
import { ELEMENT_SELECTOR } from "../../../constants/selector";

class RestaurantTab extends BaseComponent {
  private tabStatus: RestaurantTabStatus = RESTAURANT_TAB_STATUS_TABLE.all;

  private eventListeners = {
    changeTab: {
      eventName: CUSTOM_EVENT_TYPE.changeTab,
      eventHandler: this.handleChangeTabStatus.bind(this),
    },
  } as const;

  public render() {
    const menuCategoryOptions = Object.values(MENU_CATEGORIES);
    const sortCategoryOptions = Object.values(SORT_CATEGORIES_TYPE);

    this.innerHTML = `
        <restaurant-tab-header
          status="${this.tabStatus}"
        ></restaurant-tab-header>
        <restaurant-tab-body
          status="${this.tabStatus}"
        >
          <div id='restaurant-dropdown-container' class='${
            this.tabStatus === RESTAURANT_TAB_STATUS_TABLE.favorite
              ? "close"
              : "open"
          }'>
            <common-dropdown 
              classList='restaurant-filter' 
              eventType='${CUSTOM_EVENT_TYPE.filterCategory}' 
              target='${ELEMENT_SELECTOR.categoryFilter}' 
              id='category-filter' 
              options='${menuCategoryOptions}' 
            >
            </common-dropdown>            
            <common-dropdown 
              classList='restaurant-filter' 
              eventType='${CUSTOM_EVENT_TYPE.sortChange}' 
              target='${ELEMENT_SELECTOR.sortingFilter}' 
              id='sorting-filter' 
              options='${sortCategoryOptions}'
            >
            </common-dropdown>
          </div>
          <restaurant-list
            status='${this.tabStatus}'
          ></restaurant-list>
        </restaurant-tab-body>
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
