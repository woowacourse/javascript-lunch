import { OptionProps } from './tag/option';
import { Select, SelectProps } from './tag/select';

export interface FilterChangeEvent extends CustomEvent {
  detail: {
    selectedCategory: string;
    selectedSort: string;
  };
}

class FilterContainer extends HTMLDivElement {
  private category: Select;
  private sort: Select;

  constructor() {
    super();
    this.className = 'restaurant-filter-container';
    this.category = this.createCategorySelect();
    this.sort = this.createSortSelect();
    this.setEvent();
  }

  setEvent() {
    this.categoryChange();
    this.sortChange();
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
    };
    const select = new Select(sortBox);
    this.appendChild(select);
    return select;
  }

  categoryChange() {
    this.category.addEventListener('change', () => {
      const filterChangeEvent = new CustomEvent('filterChange', {
        detail: {
          selectedCategory: this.category.getValue(),
          selectedSort: this.sort.getValue(),
        },
      });
      document.dispatchEvent(filterChangeEvent);
    });
  }

  sortChange() {
    this.sort.addEventListener('change', () => {
      const filterChangeEvent = new CustomEvent('filterChange', {
        detail: {
          selectedCategory: this.category.getValue(),
          selectedSort: this.sort.getValue(),
        },
      });
      document.dispatchEvent(filterChangeEvent);
    });
  }
}

customElements.define('matzip-filter-container', FilterContainer, {extends: 'div'});

export default FilterContainer;
