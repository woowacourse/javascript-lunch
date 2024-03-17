import EventComponent from "../abstract/EventComponent";

import { ACTION_TYPES, FILTER_EVENT } from "../constants/event";
import {
  KOREAN_RESTAURANT_DISPLAYING_FILTER,
  KOREAN_SORT_FILTER,
} from "../constants/filter";

export default class FilterBar extends EventComponent {
  isDisplay: boolean;
  private handleShowFilterBind: (e: Event) => void;

  constructor() {
    super();
    this.isDisplay = true;
    this.handleShowFilterBind = this.handleShowFilter.bind(this);
  }

  protected getTemplate(): string {
    if (!this.isDisplay) return "";

    return `
    <section class="restaurant-filter-container">
      <select-box
        select-id="category-select"
        class-name="restaurant-filter" 
        options=${this.generateCategoryOptions()}
        event-name=${FILTER_EVENT.categoryFilterChange}
      ></select-box>

      <select-box
        select-id="sorting-filter"
        class-name="restaurant-filter"
        options=${this.generateSortingOptions()}
        event-name=${FILTER_EVENT.sortFilterChange}
      ></select-box>
    </section>
`;
  }

  private generateCategoryOptions() {
    return JSON.stringify(KOREAN_RESTAURANT_DISPLAYING_FILTER);
  }

  private generateSortingOptions() {
    return JSON.stringify(KOREAN_SORT_FILTER);
  }

  protected setEvent(): void {
    document.addEventListener(
      FILTER_EVENT.showFilter,
      this.handleShowFilterBind
    );
  }

  private handleShowFilter(e: Event) {
    if (e instanceof CustomEvent) {
      const { action } = e.detail;

      if (action === ACTION_TYPES.open && !this.isDisplay) {
        this.isDisplay = !this.isDisplay;
        this.render();
        return;
      }

      if (action === ACTION_TYPES.close || this.isDisplay) {
        this.isDisplay = !this.isDisplay;
        this.render();
      }
    }
  }

  protected removeEvent() {
    document.removeEventListener(
      FILTER_EVENT.showFilter,
      this.handleShowFilterBind
    );
  }
}
