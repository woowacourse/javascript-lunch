import EventComponent from "../abstract/EventComponent";
import convertObjectToOptions from "../utils/convertObjectToOptions";
import {
  FILTER_EVENT,
  TAB_SWITCH_EVENT,
  TAB_SWITCH_EVENT_SWITCH_TO,
} from "../constants/event";
import {
  KOREAN_CATEGORY_FILTER,
  KOREAN_SORT_FILTER,
} from "../constants/filter";
import { $ } from "../utils/selector";

export default class FilterBar extends EventComponent {
  protected getTemplate(): string {
    return `
      <section id="restaurant-filter-container" class="restaurant-filter-container">
        <select-box
          select-id="category-filter-select"
          class-name="restaurant-filter" 
          name="category-filter"
          options=${this.generateCategoryOptions()}
          event-name=${FILTER_EVENT.categoryFilterChange}
          label-name="카테고리필터"
        ></select-box>

        <select-box
          select-id="sorting-filter-select"
          class-name="restaurant-filter"
          name="sorting-filter"
          options=${this.generateSortingOptions()}
          event-name=${FILTER_EVENT.sortFilterChange}
          label-name="정렬기준"
        ></select-box>
      </section>
`;
  }

  protected setEvent(): void {
    document.addEventListener(TAB_SWITCH_EVENT, (e) =>
      this.handleTabSwitch(e as CustomEvent)
    );
  }

  private handleTabSwitch(e: CustomEvent) {
    const { switchTo } = e.detail;

    switch (switchTo) {
      case TAB_SWITCH_EVENT_SWITCH_TO.favorite:
        return $("#restaurant-filter-container")?.classList.add("close");

      case TAB_SWITCH_EVENT_SWITCH_TO.all:
        return $("#restaurant-filter-container")?.classList.remove("close");
    }
  }

  private generateCategoryOptions() {
    return this.generateOptions(KOREAN_CATEGORY_FILTER);
  }

  private generateSortingOptions() {
    return this.generateOptions(KOREAN_SORT_FILTER);
  }

  private generateOptions(filterLiteralObject: Record<string, string>) {
    const filteredOptions = convertObjectToOptions(filterLiteralObject);

    return JSON.stringify(filteredOptions);
  }
}
