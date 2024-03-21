import App from '../app';
import { CategoryType, SortType } from '../types';
import TabPane from './TabPane';
import ListContainer from './listContainer/ListContainer';
import Restaurant from './restaurant/Restaurant';
import { OptionProps } from './tag/option';
import { Select, SelectProps } from './tag/select';
import DOM from '../utils/DOM';

const { $ } = DOM;

class FilterContainer extends HTMLDivElement {
  private category: Select;
  private sort: Select;

  constructor() {
    super();
    this.className = 'restaurant-filter-container';
    this.category = this.createCategorySelect();
    this.sort = this.createSortSelect();
  }

  createCategorySelect() {
    const options: OptionProps[] = [
      { value: '전체', text: '전체' },
      { value: '한식', text: '한식' },
      { value: '중식', text: '중식' },
      { value: '일식', text: '일식' },
      { value: '양식', text: '양식' },
      { value: '아시안', text: '아시안' },
      { value: '기타', text: '기타' },
    ];
    const selectBox: SelectProps = {
      name: 'category',
      id: 'category-filter',
      classname: 'restaurant-filter',
      required: true,
      options: options,
      onChange: this.changeListByFilter.bind(this),
    };
    const select = new Select(selectBox);
    this.appendChild(select);
    return select;
  }

  createSortSelect() {
    const sortOptions: OptionProps[] = [
      { value: 'name', text: '이름순' },
      { value: 'distance', text: '거리순' },
    ];
    const sortBox: SelectProps = {
      name: 'sorting',
      id: 'sorting-filter',
      classname: 'restaurant-filter',
      required: true,
      options: sortOptions,
      onChange: this.changeListByFilter.bind(this),
    };
    const select = new Select(sortBox);
    this.appendChild(select);
    return select;
  }

  getFilterValues() {
    const filterValues = {
      category: this.category.getValue(),
      sort: this.sort.getValue(),
    };
    return filterValues;
  }

  changeListByFilter() {
    const selectedCategory = this.category.getValue();
    const selectedSort = this.sort.getValue();

    const restaurantElements: Restaurant[] = App.matzip
      .filterAndSort(selectedCategory as CategoryType, selectedSort as SortType)
      .map((restaurant) => new Restaurant(restaurant, App.matzip.isFavorite(restaurant.id)));

    const listContainer = new ListContainer(restaurantElements);
    const tabPane = $<TabPane>('.tabpane');
    tabPane.showListChange(listContainer);
  }
}

customElements.define('matzip-filter-container', FilterContainer, { extends: 'div' });

export default FilterContainer;
