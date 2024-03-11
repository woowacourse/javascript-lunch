import DOM from '../utils/DOM';
import { OptionProps } from './tag/option';
import { Select, SelectProps } from './tag/select';

const { $ } = DOM;

export interface FilterChangeEvent extends CustomEvent {
  detail: {
    selectedCategory: string;
    selectedSort: string;
  };
}

class FilterContainer extends HTMLElement {
  constructor() {
    super();
    this.className = 'restaurant-filter-container';
    this.setEvent();
  }

  setEvent() {
    this.createCategorySelect();
    this.createSortSelect();
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
    this.appendChild(new Select(selectBox));
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
    this.appendChild(new Select(sortBox));
  }

  categoryChange() {
    const categorySelect = $<Select>('#category-filter');
    const sortSelect = $<Select>('#sorting-filter');

    categorySelect.addEventListener('change', () => {
      const filterChangeEvent = new CustomEvent('filterChange', {
        detail: {
          selectedCategory: categorySelect.getValue(),
          selectedSort: sortSelect.getValue(),
        },
      });
      document.dispatchEvent(filterChangeEvent);
    });
  }

  sortChange() {
    const categorySelect = $<Select>('#category-filter');
    const sortSelect = $<Select>('#sorting-filter');

    sortSelect.addEventListener('change', () => {
      const filterChangeEvent = new CustomEvent('filterChange', {
        detail: {
          selectedCategory: categorySelect.getValue(),
          selectedSort: sortSelect.getValue(),
        },
      });
      document.dispatchEvent(filterChangeEvent);
    });
  }
}

customElements.define('matzip-filter-container', FilterContainer);
