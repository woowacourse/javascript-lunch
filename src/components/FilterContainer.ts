import DOM from '../utils/DOM';

import { Select } from './tag';
import { SelectProps, OptionProps } from './tag/props';

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
    this.innerHTML = /*html*/ `
      <section class="restaurant-filter-container">
      </section>
    `;
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
    $<HTMLElement>('.restaurant-filter-container').appendChild(new Select(selectBox));
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
    $<HTMLElement>('.restaurant-filter-container')?.appendChild(new Select(sortBox));
  }

  categoryChange() {
    const categorySelect = $('#category-filter');
    const sortSelect = $('#sorting-filter');

    if (!(categorySelect instanceof HTMLSelectElement)) {
      return;
    }
    if (!(sortSelect instanceof HTMLSelectElement)) {
      return;
    }

    categorySelect?.addEventListener('change', () => {
      const selectedCategory = categorySelect.options[categorySelect.selectedIndex].value;
      const selectedSort = sortSelect.options[sortSelect.selectedIndex].value;

      const filterChangeEvent = new CustomEvent('filterChange', {
        detail: {
          selectedCategory,
          selectedSort,
        },
      });
      document.dispatchEvent(filterChangeEvent);
    });
  }

  sortChange() {
    const categorySelect = $('#category-filter');
    const sortSelect = $('#sorting-filter');

    if (!(categorySelect instanceof HTMLSelectElement)) {
      return;
    }
    if (!(sortSelect instanceof HTMLSelectElement)) {
      return;
    }

    sortSelect?.addEventListener('change', () => {
      const selectedCategory = categorySelect.options[categorySelect.selectedIndex].value;
      const selectedSort = sortSelect.options[sortSelect.selectedIndex].value;

      const filterChangeEvent = new CustomEvent('filterChange', {
        detail: {
          selectedCategory,
          selectedSort,
        },
      });
      document.dispatchEvent(filterChangeEvent);
    });
  }
}

customElements.define('matzip-filter-container', FilterContainer);
