import { SELECT_OPTIONS } from '../constants/restaurant';
import { FILTER_ATTRIBUTE } from '../constants/domAttributes';
import { $ } from '../utils/domSelectors';
import Select from './Select';

class RestaurantFilters {
  private categoryFilter: Select;
  private sortingFilter: Select;

  constructor() {
    this.categoryFilter = new Select(FILTER_ATTRIBUTE.CATEGORY, SELECT_OPTIONS.CATEGORY_FILTER);
    this.sortingFilter = new Select(FILTER_ATTRIBUTE.SORTING, SELECT_OPTIONS.SORTING_FILTER);
  }

  addEvents(handleFilterChange: CallableFunction) {
    this.categoryFilter.addSelectChangeEvent(handleFilterChange);
    this.sortingFilter.addSelectChangeEvent(handleFilterChange);
  }

  render() {
    const filterContainer = $<HTMLElement>('.restaurant-filter-container');

    filterContainer.insertAdjacentHTML(
      'beforeend',
      `
      ${this.categoryFilter.create()}
      ${this.sortingFilter.create()}
      `
    );
  }
}

export default new RestaurantFilters();
