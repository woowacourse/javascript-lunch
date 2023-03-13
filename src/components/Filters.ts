import { CATEGORY, FILTER } from '../constants';
import Select from './Select';
import { CategoryOptions, FilterOptions } from '../types/type';
import { arrayElementToObject } from '../utils/util';
import { store } from '../store';

export default class Filters {
  $filterSection = document.querySelector(
    '.restaurant-filter-container'
  ) as HTMLElement;

  constructor() {
    if (!store.$listArticle) return;

    this.$filterSection.className = 'restaurant-filter-container';

    this.render(store.$listArticle);

    this.$filterSection.addEventListener('change', this.changeEventHandler);

    store.$listArticle.appendChild(this.$filterSection);
  }

  render = ($targetElement: HTMLElement) => {
    this.$filterSection.innerHTML = this.template();
    $targetElement.insertAdjacentElement('beforeend', this.$filterSection);
  };

  template() {
    const { currentFilterOptions } = store;
    return `
      ${Select({
        name: 'category',
        id: 'category-filter',
        options: arrayElementToObject(['전체', ...CATEGORY]),
        selected: currentFilterOptions.category,
        className: 'restaurant-filter',
      })}
      ${Select({
        name: 'sorting',
        id: 'sorting-filter',
        options: arrayElementToObject([...FILTER]),
        selected: currentFilterOptions.filter,
        className: 'restaurant-filter',
      })}
    `;
  }

  changeEventHandler(e: Event) {
    if (!(e.target instanceof HTMLSelectElement)) return;

    const { id, value } = e.target;
    const { setCurrentFilterOptions, currentFilterOptions } = store;

    switch (id) {
      case 'category-filter':
        setCurrentFilterOptions({
          ...currentFilterOptions,
          category: value as CategoryOptions,
        });

        break;
      case 'sorting-filter':
        setCurrentFilterOptions({
          ...currentFilterOptions,
          filter: value as FilterOptions,
        });
        break;
      default:
        return;
    }

    store.renderListArticle();
  }
}
