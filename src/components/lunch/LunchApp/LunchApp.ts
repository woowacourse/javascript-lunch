import "../../common/CommonModal/CommonModal.css";
import "./LunchApp.css";

import BaseComponent from "../../BaseComponent/BaseComponent";
import { SORT_CATEGORIES_TYPE } from "../../../constants/sortCategory/sortCategory";
import { MENU_CATEGORIES } from "../../../constants/menuCategory/menuCategory";
import { ELEMENT_SELECTOR } from "../../../constants/selector";
import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";

class LunchApp extends BaseComponent {
  protected render() {
    const menuCategoryOptions = Object.values(MENU_CATEGORIES);
    const sortCategoryOptions = Object.values(SORT_CATEGORIES_TYPE);

    this.innerHTML = `
          <global-navigation-bar></global-navigation-bar>
          <main>
            <section class="restaurant-filter-container">
              <common-dropdown 
                classList="restaurant-filter" 
                eventType="${CUSTOM_EVENT_TYPE.filterCategory}" 
                target="${ELEMENT_SELECTOR.categoryFilter}" 
                id="category-filter" 
                options="${menuCategoryOptions}" 
              >
              </common-dropdown>            
              <common-dropdown 
                classList="restaurant-filter" 
                eventType="${CUSTOM_EVENT_TYPE.sortChange}" 
                target="${ELEMENT_SELECTOR.sortingFilter}" 
                id="sorting-filter" 
                options="${sortCategoryOptions}"
              >
              </common-dropdown>
            </section>
            <restaurant-list></restaurant-list>
          </main>
          <common-modal
            id="restaurant-add-modal"
            targetSelector="${ELEMENT_SELECTOR.restaurantAddModal}"  
            open="${CUSTOM_EVENT_TYPE.restaurantAddModalOpen}"
            close="${CUSTOM_EVENT_TYPE.restaurantAddModalClose}"
            children="${`
              <h2 class='modal-title text-title'>새로운 음식점</h2>
              <restaurant-add-form></restaurant-add-form>
            `}"
          >
          </common-modal>
          <restaurant-detail-modal></restaurant-detail-modal>
        `;
  }
}

customElements.define("lunch-app", LunchApp);
