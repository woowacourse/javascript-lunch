import { restaurantService } from '..';
import { CATEGORIES, SORTS } from '../constants';
import selectTemplate from '../template/selectTemplate';
import { arrayElementToObject } from '../utils/util';

export default class Filters {
  constructor(rootElement, restaurantList) {
    this.$root = rootElement;
    this.$restaurantList = restaurantList;
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
        selected: this.category,
        className: 'restaurant-filter',
      })}
      ${selectTemplate({
        name: 'sorting',
        id: 'sorting-filter',
        options: arrayElementToObject(SORTS),
        selected: this.filter,
        className: 'restaurant-filter',
      })}
    `;
  }

  bindEvents() {
    this.$root.addEventListener('change', this.handleFiltersChange.bind(this));
  }

  handleFiltersChange(event) {
    const { id, value } = event.target;

    switch (id) {
      case 'category-filter':
        restaurantService.category = value;
        break;
      case 'sorting-filter':
        restaurantService.sort = value;
        break;
      default:
        return;
    }

    restaurantService.filterRestaurantList();
    this.$restaurantList.restaurants = restaurantService.getFilteredRestaurant();
    this.$restaurantList.remove();
    this.$restaurantList.render();
  }
}
