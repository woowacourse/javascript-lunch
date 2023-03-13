import { CATEGORY, FILTER } from '../constants';
import Select from './Select';
import { CategoryOptions, FilterOptions } from '../types/type';
import { arrayElementToObject } from '../utils/util';
import { store } from '../store';

export default class Filters {
  $filterSection = document.createElement('section');

  constructor() {
    this.$filterSection.className = 'restaurant-filter-container';

    this.render(store.$listArticle);
    this.$filterSection.addEventListener('change', (e: Event) => {
      if (!(e.target instanceof HTMLSelectElement)) return;

      const { id, value } = e.target;

      switch (id) {
        case 'category-filter':
          store.currentCategory = value as CategoryOptions;
          break;
        case 'sorting-filter':
          store.currentFilter = value as FilterOptions;
          break;
        default:
          return;
      }

      store.renderListArticle();
    });

    store.$listArticle.appendChild(this.$filterSection);
  }

  render = ($targetElement: HTMLElement) => {
    this.$filterSection.innerHTML = this.template();
    $targetElement.insertAdjacentElement('beforeend', this.$filterSection);
  };

  template() {
    return `
    ${Select({
      name: 'category',
      id: 'category-filter',
      options: arrayElementToObject(['전체', ...CATEGORY]),
      selected: store.currentCategory,
      className: 'restaurant-filter',
    })}
    ${Select({
      name: 'sorting',
      id: 'sorting-filter',
      options: arrayElementToObject([...FILTER]),
      selected: store.currentFilter,
      className: 'restaurant-filter',
    })}
  `;
  }
}
