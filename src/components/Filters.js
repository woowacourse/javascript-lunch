import { restaurantService } from '..';
import { CATEGORIES, SORTS } from '../constants';
import { arrayElementToObject } from '../utils/util';
import selectTemplate from '../template/selectTemplate';

export default class Filters {
  constructor($root) {
    this.$root = $root;
  }

  render() {
    this.$root.insertAdjacentHTML('beforeend', this.template());
  }

  template() {
    return `
      ${selectTemplate({
        name: 'category',
        id: 'category-filter',
        options: arrayElementToObject(['전체', ...CATEGORIES]),
        className: 'restaurant-filter',
      })}
      ${selectTemplate({
        name: 'sorting',
        id: 'sorting-filter',
        options: arrayElementToObject(SORTS),
        className: 'restaurant-filter',
      })}
    `;
  }

  bindEvents() {
    this.$root.addEventListener('change', this.handleFiltersChange.bind(this));
  }

  handleFiltersChange(event) {
    const { id, value } = event.target;

    if (id === 'category-filter') restaurantService.category = value;
    if (id === 'sorting-filter') restaurantService.sort = value;

    restaurantService.filterRestaurantList();

    this.restaurantList.rerender();
  }

  inject(restaurantList) {
    this.restaurantList = restaurantList;

    return this;
  }

  mount() {
    this.render();
    this.bindEvents();
  }
}
