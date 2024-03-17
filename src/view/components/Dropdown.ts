import { RESTAURANT_CATEGORY } from '../../domain/Restaurant';
import { ALL_CATEGORY, SORT_CONDITION } from '../../domain/RestaurantCatalog';

class Dropdown extends HTMLSelectElement {
  connectedCallback() {
    this.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const restaurantList = document.querySelector('.restaurant-list');
      restaurantList?.setAttribute(`data-${this.id}`, target?.value);
    });
  }

  addOptions(options: string[]) {
    this.innerHTML = '';
    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      this.appendChild(optionElement);
    });
  }
}

export function addOptionsToSelect() {
  const categorySelect = document.getElementById('category-select') as Dropdown;
  const sortSelect = document.getElementById('sort-select') as Dropdown;
  categorySelect.addOptions([ALL_CATEGORY, ...RESTAURANT_CATEGORY]);
  sortSelect.addOptions([...SORT_CONDITION]);
}

export default Dropdown;
