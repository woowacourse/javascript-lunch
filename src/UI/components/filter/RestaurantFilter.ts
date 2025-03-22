import './RestaurantFilter.css';
import { FilterOption } from '../../../Domain/types/FilterOptionType';

class RestaurantFilter<T extends string> {
  protected element: HTMLSelectElement;
  protected options: readonly FilterOption<T>[];
  protected onChange?: (value: T) => void;

  constructor(options: readonly FilterOption<T>[] = [], onChange?: (value: T) => void) {
    this.options = options;
    this.onChange = onChange;
    this.element = this.#createFilter();
    this.#addOptions();
    this.#bindEvents();
  }

  #createFilter(): HTMLSelectElement {
    const filter = document.createElement('select');
    filter.classList.add('restaurant-filter');
    return filter;
  }

  #addOptions(): void {
    this.options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      this.element.appendChild(optionElement);
    });
  }

  #bindEvents(): void {
    if (this.onChange) {
      this.element.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.onChange!(target.value as T);
      });
    }
  }

  getElement(): HTMLSelectElement {
    return this.element;
  }

  getValue(): T {
    return this.element.value as T;
  }
}

export default RestaurantFilter;
