import BaseComponent from "../abstract/BaseComponent";
import { CATEGORY_FILTER, SORT_FILTER } from "../constants/filter";

export default class FilterBar extends BaseComponent {
  protected getTemplate(): string {
    return `
    <section class="restaurant-filter-container">
      <select-box
        event-name="category-filter"
        id="category-select"
        class-name="restaurant-filter" 
        options=${this.generateCategoryOptions()}
      ></select-box>

      <select-box
        id="sorting-filter"
        class-name="restaurant-filter"
        options=${this.generateSortingOptions()}
      ></select-box>
    </section>
`;
  }

  private generateCategoryOptions() {
    return this.generateOptions(CATEGORY_FILTER);
  }

  private generateSortingOptions() {
    return this.generateOptions(SORT_FILTER);
  }

  private generateOptions(filterLiteralObject: Record<string, string>) {
    const filterOptions = Object.entries(filterLiteralObject).map(
      ([key, value]) => {
        return { value: key, label: value };
      }
    );

    return JSON.stringify(filterOptions);
  }
}
