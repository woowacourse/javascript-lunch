import type { RestaurantFilter } from '../../../domain/RestaurantFilter';
import { filterBy, sortByName } from '../../../domain/RestaurantFilter';
import restaurants from '../../../states/restaurants';
import Component from '../../Component';
import { define } from '../../decorators';
import type RestaurantCategorySelect from '../form/RestaurantCategorySelect';
import type RestaurantSortSelect from '../form/RestaurantSortSelect';
import style from './index.css';

export type RestaurantFilterChangeEvent = CustomEvent<RestaurantFilter[]>;

@define('r-restaurant-filter-panel')
class RestaurantFilterPanel extends Component {
  private filterFn: RestaurantFilter | null = null;

  private sortFn: RestaurantFilter = sortByName;

  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  private onCategoryChange() {
    const $category = this.shadowRoot!.querySelector<RestaurantCategorySelect>(
      'r-restaurant-category-select',
    )!;
    const category = $category.getSelectedOption()?.value;

    this.filterFn = category
      ? filterBy((restaurant) => restaurant.getCategory() === category)
      : null;

    this.onChange();
  }

  private onSortChange() {
    const $sort = this.shadowRoot!.querySelector<RestaurantSortSelect>('r-restaurant-sort-select')!;
    const sortFn = $sort.getSelectedOption()?.value;

    this.sortFn = sortFn ?? sortByName;
    this.onChange();
  }

  private onChange() {
    restaurants.setFilters(this.getFilters());
  }

  override getRenderTemplate() {
    return `
      <form onsubmit="return false">
        <r-restaurant-category-select
          name="category"
          default-option-label="전체"
        ></r-restaurant-category-select>

        <r-restaurant-sort-select
          name="sort"
        ></r-restaurant-sort-select>
      </form>
    `;
  }

  protected override renderCallback() {
    this.shadowRoot!.querySelector('r-restaurant-category-select')?.addEventListener(
      'change',
      () => {
        this.onCategoryChange();
      },
    );
    this.shadowRoot!.querySelector('r-restaurant-sort-select')?.addEventListener('change', () => {
      this.onSortChange();
    });
  }

  getFilters(): RestaurantFilter[] {
    return [this.filterFn, this.sortFn].filter((fn): fn is RestaurantFilter => !!fn);
  }
}

export default RestaurantFilterPanel;
