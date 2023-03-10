import { RestaurantCategory } from '../../../domain/Restaurant';
import { filterBy, RestaurantFilter, sortByName } from '../../../domain/RestaurantFilter';
import restaurants from '../../../states/restaurants';
import Component from '../../Component';
import { define } from '../../decorators';
import style from './index.css';

export type RestaurantFilterChangeEvent = CustomEvent<RestaurantFilter[]>;

@define('r-restaurant-filter-panel')
class RestaurantFilterPanel extends Component {
  private filterFn: RestaurantFilter | null = null;

  private sortFn: RestaurantFilter = sortByName;

  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  onCategoryChange(category: RestaurantCategory | null) {
    this.filterFn = category
      ? filterBy((restaurant) => restaurant.getCategory() === category)
      : null;

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

export default RestaurantFilterPanel;
