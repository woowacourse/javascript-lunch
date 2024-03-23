import { ICategory } from '../../domain/Restaurant';
import { TSortCondition } from '../../domain/RestaurantCatalog';
import Dropdown from './Dropdown';
import './Dropdown.css';

type optionsType = readonly (TSortCondition | ICategory)[];

class RestaurantDropdown extends Dropdown {
  #dropdownElement = this.element;

  #onChange: (state: string) => void;

  constructor(id: string, name: string, options: optionsType, onChange: (state: string) => void) {
    super(id, name, options as string[]);
    this.#onChange = onChange;
    this.#dropdownElement.classList.add('restaurant-filter');

    this.#addChangeEvent();
  }

  #addChangeEvent() {
    this.#dropdownElement.addEventListener('change', (event) => {
      const target = event.target as HTMLSelectElement;
      const selectedValue = target.value;

      this.#onChange(selectedValue);
    });
  }
}

export default RestaurantDropdown;
