import generateSelectField from './template/generateSelectField';
import RestaurantList from '../layouts/RestaurantList';

import { $ } from '../utils/dom';
import { FIELD_IDS, SELECT_FIELD } from '../constants/rules';

class FilteringSelectBox {
  #element;
  #restaurants;

  constructor({ targetId, restaurants }) {
    this.#element = $(targetId);
    this.#restaurants = restaurants;

    this.#initEventListeners();
  }

  render() {
    this.#element.appendChild(generateSelectField(SELECT_FIELD.sortingFilter));
    this.#element.appendChild(generateSelectField(SELECT_FIELD.categoryFilter));
  }

  #initEventListeners() {
    this.#element.addEventListener('change', this.#handleSelectChange.bind(this));
  }

  #handleSelectChange({ target }) {
    if (FIELD_IDS.selectIds.some((selectId) => target.id === selectId)) {
      const selectedValue = target.options[target.selectedIndex].value;
      this.#restaurants.standard = { id: target.id, standard: selectedValue };
    }

    this.#reRenderRestaurantList();
  }

  #reRenderRestaurantList() {
    $('restaurant-list').innerHTML = '';
    new RestaurantList({
      targetId: 'restaurant-list',
      restaurants: this.#restaurants.standardList,
    }).render();
  }
}

export default FilteringSelectBox;
