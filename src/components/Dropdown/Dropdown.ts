import { DISTANCE_FROM_CAMPUS, RESTAURANT_CATEGORY } from '../../domain/Restaurant';
import { CATEGORY_ALL, SORT_CONDITION } from '../../domain/RestaurantCatalog';

type optionsType = typeof SORT_CONDITION | typeof RESTAURANT_CATEGORY | typeof DISTANCE_FROM_CAMPUS;

class Dropdown extends HTMLSelectElement {
  constructor(id: string, name: string, options: optionsType) {
    super();
    this.id = id;
    this.name = name;
    this.#addDefaultSelectOption();
    this.#renderDropdownOptions(options);
  }

  #addDefaultSelectOption() {
    if (this.id === 'category-select') {
      const optionElement = this.#makeOptionElement(CATEGORY_ALL, CATEGORY_ALL);
      this.appendChild(optionElement);
    }

    if (this.id === 'form-category-select-container' || this.id === 'form-distance-select-container') {
      const optionElement = this.#makeOptionElement('선택해 주세요', '');
      this.appendChild(optionElement);
      this.required = true;
    }
  }

  #renderDropdownOptions(options: optionsType) {
    options.forEach((option) => {
      const optionElement = this.#makeOptionElement(option.toString(), option.toString());

      this.appendChild(optionElement);
    });
  }

  #makeOptionElement(option: string, value: string) {
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = option;

    return optionElement;
  }
}

export default Dropdown;
