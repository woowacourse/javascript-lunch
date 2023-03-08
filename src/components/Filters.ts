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

  state: IFilterState;

  constructor(
    $root: HTMLElement,
    updateRestaurantList: (
      category: CategoryOptions,
      filter: FilterOptions
    ) => void
  ) {
    this.$filterSection.className = 'restaurant-filter-container';
    this.state = {
      category: '전체',
      filter: '이름순',
    };
    this.render();
    this.$filterSection.addEventListener('change', (e) =>
      this.handleFiltersChange(e, updateRestaurantList)
    );
    $root.appendChild(this.$filterSection);
  }

  render = () => {
    this.$filterSection.innerHTML = `
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
  };

  setState = (state: IFilterState) => {
    this.state = { ...this.state, ...state };
    this.render();
  };

  handleFiltersChange = (
    event: Event,
    updateRestaurantList: (
      category: CategoryOptions,
      filter: FilterOptions
    ) => void
  ) => {
    const { category, filter } = this.state;
    const { id, value } = event.target as HTMLSelectElement;

    switch (id) {
      case 'category-filter':
        updateRestaurantList(value as CategoryOptions, filter);
        break;
      case 'sorting-filter':
        updateRestaurantList(category, value as FilterOptions);
        break;
      default:
        return;
    }
  };
}
