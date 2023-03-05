import { FILTER_CATEGORY, SORT_CONDITION } from '../data/Constants';
import { FilterCategory, SortCondition } from '../domain/RestaurantList';
import { $ } from '../util/dom';

class RestaurantFilterBar {
  template = () => `
    <section class="restaurant-filter-container">
      <select name="category" id="category-filter" class="restaurant-filter">${FILTER_CATEGORY.map(
        (category) => `<option value="${category}">${category}</option>`,
      ).join('')}
      </select>
      <select name="sorting" id="sorting-filter" class="restaurant-filter">${SORT_CONDITION.map(
        (condition) => `<option value="${condition}">${condition}순</option>`,
      ).join('')}
      </select>
    </section>`;

  render = (target: HTMLElement) => {
    target.insertAdjacentHTML('beforeend', this.template());
  };

  get category() {
    return ($('#category-filter') as HTMLInputElement).value as FilterCategory;
  }

  get sortCondition() {
    return ($('#sorting-filter') as HTMLInputElement).value as SortCondition;
  }

  setSelectChangeHandler = (
    handler: (category: FilterCategory, sortCondition: SortCondition) => void,
  ) => {
    ['#category-filter', '#sorting-filter'].forEach((id) => {
      $(id)?.addEventListener('change', (event) => {
        event.preventDefault();

        handler(this.category, this.sortCondition);
      });
    });
  };
}

export default new RestaurantFilterBar();
