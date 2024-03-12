import Restaurant from '../Common/Restaurant/Restaurant';
import Select from '../Common/Select/Select';
import { $ } from '../../utils/dom';
import { RULES, SELECT_FILTER_DATA } from '../../constants/rules';

export default class RestaurantFilter {
  #restaurants;

  constructor(restaurants) {
    this.#restaurants = restaurants;
    this.#addEvents();
  }

  render() {
    return (
      Select(SELECT_FILTER_DATA.sorting, localStorage.getItem('sorting-filter')) +
      Select(SELECT_FILTER_DATA.category, localStorage.getItem('category-filter'))
    );
  }

  #addEvents() {
    $('restaurant-filter-container').addEventListener('change', (event) =>
      this.#handleSelectChange(event.target),
    );
  }

  #handleSelectChange(target) {
    if (RULES.selectIds.some((id) => target.id === id)) {
      const selectedValue = target.options[target.selectedIndex].value;
      this.#restaurants.standard = { id: target.id, standard: selectedValue };
    }

    this.#reRenderRestaurantList();
  }

  #reRenderRestaurantList() {
    $('restaurant-list').innerHTML = '';
    this.#restaurants.standardList.forEach((restaurantData) => {
      $('restaurant-list').innerHTML += Restaurant(restaurantData);
    });
  }
}
