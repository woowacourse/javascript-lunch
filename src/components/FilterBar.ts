import BaseComponent from "../abstract/BaseComponent";

import convertObjectToOptions from "../utils/convertObjectToOptions";
import { FILTER_EVENT } from "../constants/event";
import {
  KOREAN_CATEGORY_FILTER,
  KOREAN_SORT_FILTER,
} from "../constants/filter";

export default class FilterBar extends BaseComponent {
  protected getTemplate(): string {
    return `
    <section class="restaurant-filter-container">
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
