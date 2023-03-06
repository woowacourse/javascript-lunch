import { CATEGORY, SORT } from '../constants';
import selectTemplate from '../template/selectTemplate';
import { arrayElementToObject } from '../utils/util';

export default function Filters($root, handleFiltersChange) {
  const $filterSection = document.createElement('section');
  $filterSection.className = 'restaurant-filter-container';

  this.state = {
    category: '전체',
    filter: '이름순',
  };

  this.init = () => {
    this.render();
    $filterSection.addEventListener('change', handleFiltersChange);
    $root.appendChild($filterSection);
  };

  this.render = () => {
    $filterSection.innerHTML = `
    ${selectTemplate({
      name: 'category',
      id: 'category-filter',
      options: arrayElementToObject(['전체', ...CATEGORY]),
      selected: this.state.category,
      className: 'restaurant-filter',
    })}
    ${selectTemplate({
      name: 'sorting',
      id: 'sorting-filter',
      options: arrayElementToObject(SORT),
      selected: this.state.filter,
      className: 'restaurant-filter',
    })}
  `;
  };

  this.setState = (state) => {
    this.state = { ...this.state, ...state };
    this.render();
  };

  this.init();
}
