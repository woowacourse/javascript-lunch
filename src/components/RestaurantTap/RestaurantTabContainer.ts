import BaseComponent from "../BaseComponent";
import { MENU_APP_EVENTS } from "../../constants/event";
import { RESTAURANT_TABS } from "../../constants/menu";
import { RestaurantTab } from "../../types/menu";

class RestaurantTabContainer extends BaseComponent {
  private currentTab: RestaurantTab = "all";

  protected render() {
    this.innerHTML = /*html*/ `
    <restaurant-tab 
      class="w-full flex flex-col" 
      text="${RESTAURANT_TABS.all}"
      is-active=${this.currentTab === "all"}></restaurant-tab>    
    <restaurant-tab 
      class="w-full flex flex-col" 
      text="${RESTAURANT_TABS.favorite}"
      is-active=${this.currentTab === "favorite"}></restaurant-tab>
    `;
  }

  private getChangedTabType(tabText: string): RestaurantTab {
    if (tabText === RESTAURANT_TABS.all) return "all";
    if (tabText === RESTAURANT_TABS.favorite) return "favorite";
  }

  private shouldChangeTab(tabType: RestaurantTab): boolean | undefined {
    return tabType && tabType !== this.currentTab;
  }

  private handleTabChange(tabText: string) {
    const changedTabType = this.getChangedTabType(tabText);
    if (!this.shouldChangeTab(changedTabType)) return;

    this.currentTab = changedTabType;
    this.render();
    this.emitEvent<{ tab: RestaurantTab }>(MENU_APP_EVENTS.changeTabState, {
      tab: this.currentTab,
    });
  }

  protected setEvent() {
    this.addEventListener("click", (event) => {
      if (!(event.target instanceof HTMLSpanElement)) return;
      this.handleTabChange(event.target.innerText);
    });
  }
}

customElements.define("restaurant-tab-container", RestaurantTabContainer);
