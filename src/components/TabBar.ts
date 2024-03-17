import EventComponent from "../abstract/EventComponent";

import { $$ } from "../utils/selector";
import { TAB_SWITCH_EVENT } from "../constants/event";

export default class TabBar extends EventComponent {
  protected eventHandlerRegistrations = [
    {
      target: ".tab-bar",
      eventName: "click",
      handler: this.handleTabItemClick.bind(this),
    },
  ];

  protected getTemplate(): string {
    return `
      <div class="tab-bar">
        <div id="tab-item-all" class="tab-bar-item active" data-switch-to="all">모든 음식점</div>
        <div id="tab-item-favorite" class="tab-bar-item" data-switch-to="favorite">자주 가는 음식점</div>
      </div>
    `;
  }

  private handleTabItemClick(e: Event) {
    const target = e.target as HTMLElement;

    if (
      !target.classList.contains("tab-bar-item") ||
      target.classList.contains("active")
    ) {
      return;
    }

    this.toggleTabItems();

    this.dispatchCustomEvent(TAB_SWITCH_EVENT, {
      switchTo: target.dataset.switchTo,
    });
  }

  private toggleTabItems() {
    const tabItems = $$(".tab-bar-item");

    tabItems?.forEach((tabItem) => {
      tabItem.classList.toggle("active");
    });
  }
}
