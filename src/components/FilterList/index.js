import { restaurant } from '../../domain/restaurant';
import { $ } from '../../utils';
import './index.css';

class FilterList extends HTMLElement {
  connectedCallback() {
    this.render();
    this.filterEvent();
    this.sortEvent();
  }

  render() {
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const optionsAttribute = this.getAttribute('options').split(',');
    const options = optionsAttribute.map((option) => this.createOption(option));

    this.innerHTML = `<select name="${name}" id="${id}" class="restaurant-filter">
    ${options.join('\n')}
  </select>`;
  }

  createOption(title) {
    return `<option value="${title}">${title}</option>`;
  }

  filterEvent() {
    $('#categoryFilter').addEventListener('change', (e) => {
      const categoryValue = e.target.value;
      restaurant.filterByCategory(categoryValue);
    });
  }

  sortEvent() {
    $('#sortingFilter').addEventListener('change', (e) => {
      const sortingValue = e.target.value;
      restaurant.sortByType(sortingValue);
    });
  }
}

export default FilterList;
