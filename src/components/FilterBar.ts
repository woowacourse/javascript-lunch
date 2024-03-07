import BaseComponent from "../abstract/BaseComponent";
import { EVENT } from "../constants/event";
import {
  KOREAN_CATEGORY_FILTER,
  KOREAN_SORT_FILTER,
} from "../constants/filter";
import convertObjectToOptions from "../utils/convertObjectToOptions";

export default class FilterBar extends BaseComponent {
  protected getTemplate(): string {
    return `
    <section class="restaurant-filter-container">
      <select-box
        id="category-select"
        class-name="restaurant-filter" 
        options=${this.generateCategoryOptions()}
        event-name=${EVENT.categoryFilterChanged}
      ></select-box>

      <select-box
        id="sorting-filter"
        class-name="restaurant-filter"
        options=${this.generateSortingOptions()}
        event-name=${EVENT.sortFilterChanged}
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
    const fiilteredOptions = convertObjectToOptions(filterLiteralObject);

    return JSON.stringify(fiilteredOptions);
  }
}
