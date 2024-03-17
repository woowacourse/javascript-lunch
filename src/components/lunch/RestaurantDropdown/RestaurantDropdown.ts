import BaseComponent from "../../BaseComponent/BaseComponent";

import { RESTAURANT_TAB_STATUS_TABLE } from "../RestaurantTab/RestaurantTab.constant";

import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";
import { MENU_CATEGORIES } from "../../../constants/menuCategory/menuCategory";
import { ELEMENT_SELECTOR } from "../../../constants/selector";
import { SORT_CATEGORIES_TYPE } from "../../../constants/sortCategory/sortCategory";

class RestaurantDropdown extends BaseComponent {
  protected render(): void {
    const menuCategoryOptions = Object.values(MENU_CATEGORIES);
    const sortCategoryOptions = Object.values(SORT_CATEGORIES_TYPE);

    const tabStatus = this.getAttribute("status");

    this.innerHTML = /* html */ ` 
    <div
      id="restaurant-dropdown-container"
      class="${
        tabStatus === RESTAURANT_TAB_STATUS_TABLE.favorite ? "close" : "open"
      }"
    >
      <common-dropdown
        id="category-filter"
        classList="restaurant-filter"
        eventType="${CUSTOM_EVENT_TYPE.filterCategory}"
        target="${ELEMENT_SELECTOR.categoryFilter}"
        options="${menuCategoryOptions}"
      >
      </common-dropdown>
      <common-dropdown
        id="sorting-filter"
        classList="restaurant-filter"
        eventType="${CUSTOM_EVENT_TYPE.sortChange}"
        target="${ELEMENT_SELECTOR.sortingFilter}"
        options="${sortCategoryOptions}"
      >
      </common-dropdown>
    </div>`;
  }
}

customElements.define("restaurant-dropdown", RestaurantDropdown);
