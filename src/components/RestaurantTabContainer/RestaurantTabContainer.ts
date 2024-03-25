import BaseComponent from "../BaseComponent/BaseComponent";
import type { CustomEventListenerDictionary } from "../BaseComponent/BaseComponent.type";

import TabContainer from "../../utils/TabContainer/TabContainer";

import { $ } from "../../utils/dom";
import { ELEMENT_SELECTOR } from "../../constants/selector";

class RestaurantTabContainer extends BaseComponent {
  private tabContainerConfig = {
    name: "restaurant",
    tabItems: [
      { "all-restaurants": this.getAllRestaurantBtn() },
      { "favorite-restaurants": this.getFavoriteRestaurantBtn() },
    ] as Record<string, string>[],
  };

  private tabContainer = new TabContainer(this.tabContainerConfig);

  private eventListeners: CustomEventListenerDictionary = {
    allRestaurantTabClick: {
      eventName: "click",
      eventHandler: this.handleClickAllRestaurantTab.bind(this),
    },

    favoriteRestaurantTabClick: {
      eventName: "click",
      eventHandler: this.handleClickFavoriteRestaurantTab.bind(this),
    },
  };

  constructor() {
    super();
  }

  private getAllRestaurantBtn(): string {
    return `
      <button id ="all-restaurants-button" type="button">
        모든 음식점
      </button>
    `;
  }

  private getFavoriteRestaurantBtn(): string {
    return `
      <button 
        id="favorite-restaurants-button" 
        type="button"
      >
        자주 가는 음식점
      </button>
    `;
  }

  protected render(): void {
    this.innerHTML = this.tabContainer.getTemplate();
  }

  private handleClickAllRestaurantTab() {
    $(ELEMENT_SELECTOR.selectedListContainer).innerHTML = `
      <section class="restaurant-filter-container">
        <category-dropdown></category-dropdown>
        <sort-dropdown></sort-dropdown>
      </section>
      
      <restaurant-list></restaurant-list>
    `;
  }

  private handleClickFavoriteRestaurantTab() {
    $(ELEMENT_SELECTOR.selectedListContainer).innerHTML = `
      <section class="selected-list-container">
        <favorite-restaurant-list></favorite-restaurant-list>
      </section>
    `;
  }

  protected setEvent(): void {
    this.tabContainer.setEvent();

    this.on({
      ...this.eventListeners.allRestaurantTabClick,
      target: $(ELEMENT_SELECTOR.allRestaurantButton),
    });

    this.on({
      ...this.eventListeners.favoriteRestaurantTabClick,
      target: $(ELEMENT_SELECTOR.favoriteRestaurantButton),
    });

    this.handleClickAllRestaurantTab();
  }
}

customElements.define("restaurant-tab-container", RestaurantTabContainer);

export default RestaurantTabContainer;
