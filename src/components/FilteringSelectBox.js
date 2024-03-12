import generateRestaurantItem from './template/generateRestaurantItem';
import { $ } from '../utils/dom';
import { FIELD_IDS, SELECT_FIELD } from '../constants/rules';
import generateSelectField from './template/generateSelectField';

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
    this.#restaurants.standardList.forEach((restaurantData) => {
      $('restaurant-list').innerHTML += generateRestaurantItem(restaurantData);
    });
  }
}

export default FilteringSelectBox;
