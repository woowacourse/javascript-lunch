import EventComponent from "../abstract/EventComponent";
import { TAB_SWITCH_EVENT } from "../constants/event";
import { $, $$ } from "../utils/selector";

export default class TabBar extends EventComponent {
  protected getTemplate(): string {
    return `
      <div class="tab-bar">
        <div id="tab-item-all" class="tab-bar-item active" data-switch-to="all">모든 음식점</div>
        <div id="tab-item-favorite" class="tab-bar-item" data-switch-to="favorite">자주 가는 음식점</div>
      </div>
    `;
  }

  protected setEvent(): void {
    $(".tab-bar")?.addEventListener(
      "click",
      this.handleTabItemClick.bind(this)
    );
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

    this.dispatchEvent(
      new CustomEvent(TAB_SWITCH_EVENT, {
        bubbles: true,
        detail: {
          switchTo: target.dataset.switchTo,
        },
      })
    );
  }

  private toggleTabItems() {
    const tabItems = $$(".tab-bar-item");

    tabItems?.forEach((tabItem) => {
      tabItem.classList.toggle("active");
    });
  }
}
