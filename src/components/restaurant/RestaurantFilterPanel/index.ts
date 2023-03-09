import { RestaurantCategory } from '../../../domain/Restaurant';
import { filterBy, RestaurantFilter, sortByName } from '../../../domain/RestaurantFilter';
import restaurants from '../../../states/restaurants';
import Component from '../../Component';
import style from './index.css';

export type RestaurantFilterChangeEvent = CustomEvent<RestaurantFilter[]>;

class RestaurantFilterPanel extends Component {
  private filterFn: RestaurantFilter | null = null;

  private sortFn: RestaurantFilter = sortByName;

  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  onCategoryChange(category: RestaurantCategory | null) {
    if (!category) {
      this.filterFn = null;
      return;
    }
    this.filterFn = filterBy((restaurant) => restaurant.getCategory() === category);
    this.onChange();
  }

  onSortChange(sortFn: RestaurantFilter) {
    this.sortFn = sortFn;
    this.onChange();
  }

  onChange() {
    restaurants.setFilters(this.getFilters());
  }

  override renderTemplate() {
    return `
      <form onsubmit="return false">
        <r-restaurant-category-select
          name="category"
          default-option-label="전체"
          onchange="this.host.onCategoryChange(this.getSelectedOption().value)"
        ></r-restaurant-category-select>

        <r-restaurant-sort-select
          name="sort"
          onchange="this.host.onSortChange(this.getSelectedOption().value)"
        ></r-restaurant-sort-select>
      </form>
    `;
  }

  getFilters(): RestaurantFilter[] {
    return [this.filterFn, this.sortFn].filter((fn): fn is RestaurantFilter => !!fn);
  }
}

customElements.define('r-restaurant-filter-panel', RestaurantFilterPanel);

export default RestaurantFilterPanel;
