import { CATEGORY, FILTER } from '../constants';
import Select from './Select';
import { CategoryOptions, FilterOptions } from '../types/type';
import { arrayElementToObject } from '../utils/util';

interface IFilterState {
  category: CategoryOptions;
  filter: FilterOptions;
}

export default class Filters {
  $filterSection = document.createElement('section');
  state!: IFilterState;

  constructor(
    $root: HTMLElement,
    renderAllList: ($targetElement: HTMLElement) => void
  ) {
    this.$filterSection.className = 'restaurant-filter-container';
    this.setState({ category: '전체', filter: '이름순' });

    this.render($root);
    this.$filterSection.addEventListener('change', (e: Event) => {
      if (!(e.target instanceof HTMLSelectElement)) return;

      const { category, filter } = this.state;
      const { id, value } = e.target;

      switch (id) {
        case 'category-filter':
          this.setState({ category: value as CategoryOptions, filter });
          break;
        case 'sorting-filter':
          this.setState({ category, filter: value as FilterOptions });
          break;
        default:
          return;
      }

      renderAllList($root);
    });
    $root.appendChild(this.$filterSection);
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
      selected: this.state.category,
      className: 'restaurant-filter',
    })}
    ${Select({
      name: 'sorting',
      id: 'sorting-filter',
      options: arrayElementToObject([...FILTER]),
      selected: this.state.filter,
      className: 'restaurant-filter',
    })}
  `;
  }

  setState = (state: IFilterState) => {
    this.state = { ...this.state, ...state };
  };
}
