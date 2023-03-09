import { SELECT_OPTIONS } from '../constants/constants';
import { FILTER_ATTRIBUTE } from '../constants/domAttributes';
import Select from './Select';

class RestaurantFilters {
  private categoryFilter: Select;
  private sortingFilter: Select;

  constructor() {
    this.categoryFilter = new Select(FILTER_ATTRIBUTE.CATEGORY, SELECT_OPTIONS.CATEGORY_FILTER);
    this.sortingFilter = new Select(FILTER_ATTRIBUTE.SORTING, SELECT_OPTIONS.SORTING_FILTER);
  }

  addEvents(changeFilter: CallableFunction) {
    this.categoryFilter.addSelectChangeEvent(changeFilter);
    this.sortingFilter.addSelectChangeEvent(changeFilter);
  }

  create() {
    return `
      <section class="restaurant-filter-container">
        ${this.categoryFilter.create()}
        ${this.sortingFilter.create()}
      </section>  
    `;
  }
}

export default new RestaurantFilters();
