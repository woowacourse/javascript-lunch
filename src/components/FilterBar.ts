import BaseComponent from "../abstract/BaseComponent";

import { FILTER_EVENT } from "../constants/event";
import {
  KOREAN_RESTAURANT_DISPLAYING_FILTER,
  KOREAN_SORT_FILTER,
} from "../constants/filter";

export default class FilterBar extends BaseComponent {
  protected getTemplate(): string {
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
}
