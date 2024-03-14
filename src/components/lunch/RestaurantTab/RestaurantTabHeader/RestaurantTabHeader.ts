import "./RestaurantTabHeader.css";

import BaseComponent from "../../../BaseComponent/BaseComponent";

import { RESTAURANT_TAB_STATUS_TABLE } from "../RestaurantTab.constant";

class RestaurantTabHeader extends BaseComponent {
  public render() {
    const tabStatus = this.getAttribute("status");

    this.innerHTML = `
        <nav id='restaurant-tab-header'>
            <restaurant-tab-button
              isActiveTab='${tabStatus === RESTAURANT_TAB_STATUS_TABLE.all}'
              id='${RESTAURANT_TAB_STATUS_TABLE.all}'
              text='모든 음식점'
            ></restaurant-tab-button>
            <restaurant-tab-button
              isActiveTab='${
                tabStatus === RESTAURANT_TAB_STATUS_TABLE.favorite
              }'
              id='${RESTAURANT_TAB_STATUS_TABLE.favorite}'
              text='자주 가는 음식점'
            ></restaurant-tab-button>
        </nav>
    `;
  }
}

customElements.define("restaurant-tab-header", RestaurantTabHeader);

export default RestaurantTabHeader;
