import DOM from '../utils/DOM';

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
        <select name="category" id="category-filter" class="restaurant-filter">
          <option value="전체">전체</option>
          <option value="한식">한식</option>
          <option value="중식">중식</option>
          <option value="일식">일식</option>
          <option value="양식">양식</option>
          <option value="아시안">아시안</option>
          <option value="기타">기타</option>
        </select>
        <!-- 정렬 셀렉트 박스 -->
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          <option value="name">이름순</option>
          <option value="distance">거리순</option>
        </select>
      </section>
    `;
    this.setEvent();
  }

  setEvent() {
    this.categoryChange();
    this.sortChange();
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
