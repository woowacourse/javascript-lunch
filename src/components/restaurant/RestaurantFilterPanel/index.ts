import type Select from '@/components/common/form/Select';
import Component from '@/components/Component';
import { define } from '@/components/decorators';
import type { RestaurantFilter } from '@/domain/RestaurantFilters';
import RestaurantFilters from '@/domain/RestaurantFilters';
import restaurants from '@/states/restaurants';
import type RestaurantCategorySelect from '../form/RestaurantCategorySelect';
import style from './index.css';

export type RestaurantFilterChangeEvent = CustomEvent<RestaurantFilter[]>;

@define('r-restaurant-filter-panel')
class RestaurantFilterPanel extends Component {
  private filterFn: RestaurantFilter | null = null;

  private sortFn: RestaurantFilter = RestaurantFilters.sortByName;

  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  private onCategoryChange() {
    const $category = this.shadowRoot!.querySelector<RestaurantCategorySelect>(
      'r-restaurant-category-select',
    )!;
    const category = $category.getSelectedOption()?.value;

    this.filterFn = category
      ? RestaurantFilters.filterBy((restaurant) => restaurant.getCategory() === category)
      : null;

    this.onChange();
  }

  private onSortChange() {
    const $sort = this.shadowRoot!.querySelector<Select<RestaurantFilter>>('r-select')!;
    const sortFn = $sort.getSelectedOption()?.value;

    this.sortFn = sortFn ?? RestaurantFilters.sortByName;
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

        <r-select name="sort"></r-select>
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
    this.shadowRoot!.querySelector('r-select')?.addEventListener('change', () => {
      this.onSortChange();
    });
    this.shadowRoot!.querySelector<Select<RestaurantFilter>>('r-select')?.setOptions([
      { value: RestaurantFilters.sortByName, label: '이름순' },
      { value: RestaurantFilters.sortByDistance, label: '거리순' },
    ]);
  }

  getFilters(): RestaurantFilter[] {
    return [this.filterFn, this.sortFn].filter((fn): fn is RestaurantFilter => !!fn);
  }
}

export default RestaurantFilterPanel;
