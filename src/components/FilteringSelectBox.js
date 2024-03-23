import generateSelectField from './template/generateSelectField';
import RestaurantList from '../layouts/RestaurantList';

import { $ } from '../utils/dom';
import { FIELD_IDS, SELECT_FIELD } from '../constants/rules';
import { generateRestaurantItems } from './template/generateRestaurantItems';

class FilteringSelectBox {
  #element;
  #restaurantsInstance;

  constructor({ targetId, restaurantsInstance }) {
    this.#element = $(targetId);
    this.#restaurantsInstance = restaurantsInstance;

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
      this.#restaurantsInstance.standard = { id: target.id, standard: selectedValue };
    }

    this.#reRenderRestaurantList();
  }

  #reRenderRestaurantList() {
    $('restaurant-list').innerHTML = generateRestaurantItems(
      this.#restaurantsInstance.standardList,
    );
  }
}

export default FilteringSelectBox;
