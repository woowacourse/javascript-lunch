import BaseComponent from "../abstract/BaseComponent";

import convertObjectToOptions from "../utils/convertObjectToOptions";
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
    return this.generateOptions(KOREAN_RESTAURANT_DISPLAYING_FILTER);
  }

  private generateSortingOptions() {
    return this.generateOptions(KOREAN_SORT_FILTER);
  }

  private generateOptions(filterLiteralObject: Record<string, string>) {
    const filteredOptions = convertObjectToOptions(filterLiteralObject);

    return JSON.stringify(filteredOptions);
  }
}
