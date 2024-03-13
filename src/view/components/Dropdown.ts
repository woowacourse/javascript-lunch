import { DISTANCE_FROM_CAMPUS, RESTAURANT_CATEGORY } from '../../domain/Restaurant';
import { SORT_CONDITION } from '../../domain/RestaurantCatalog';

type optionsType = typeof SORT_CONDITION | typeof RESTAURANT_CATEGORY | typeof DISTANCE_FROM_CAMPUS;

class Dropdown extends HTMLSelectElement {
  constructor(id: string, name: string, options: optionsType) {
    super();
    this.id = id;
    this.name = name;
    this.#addDefaultSelectOption(id);
    this.#renderDropdownOptions(options);
  }

  connectedCallback() {
    this.addEventListener('change', (event) => {
      const target = event.target as HTMLSelectElement;
      const selectedValue = target.value;

      this.#setAttributeCategorySelect(selectedValue);
      this.#setAttributeSortSelect(selectedValue);
    });
  }

  #setAttributeCategorySelect(selectedValue: string) {
    const restaurantList = document.querySelector('.restaurant-list');
    if (this.id === 'category-select') {
      restaurantList?.setAttribute('data-category', selectedValue);
    }
  }

  #setAttributeSortSelect(selectedValue: string) {
    const restaurantList = document.querySelector('.restaurant-list');
    if (this.id === 'sort-select') {
      restaurantList?.setAttribute('data-sort', selectedValue);
    }
  }

  #renderDropdownOptions(options: optionsType) {
    options.forEach((option) => {
      const optionElement = this.#makeOptionElement(option.toString(), option.toString());
      this.appendChild(optionElement);
    });
  }

  #addDefaultSelectOption(id: string) {
    if (id === 'category-select') {
      const optionElement = this.#makeOptionElement('전체', '전체');
      this.appendChild(optionElement);
    }
    if (id === 'form-category-select-container' || id === 'form-distance-select-container') {
      const optionElement = this.#makeOptionElement('선택해 주세요', '');
      this.appendChild(optionElement);
      this.required = true;
    }
  }

  #makeOptionElement(option: string, value: string) {
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = option;

    return optionElement;
  }
}

export default Dropdown;
