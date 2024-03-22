import { RestaurantCategory, Sort } from '../../../constants/enums';
import { $ } from '../../../utils/domSelector';

class SelectBoxSection extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEvent();
  }

  private addEvent() {
    const categoryFilter = $('#category-filter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (event: Event) => {
        this.dispatchEvent(
          new CustomEvent('changeRestaurantCategory', {
            detail: (event.target as HTMLSelectElement).value,
          }),
        );
      });
    }

    const sortingFilter = $('#sorting-filter');
    if (sortingFilter) {
      sortingFilter.addEventListener('change', (event: Event) => {
        this.dispatchEvent(
          new CustomEvent('changeSort', {
            detail: (event.target as HTMLSelectElement).value,
          }),
        );
      });
    }
  }

  private getRestaurantCategoryName() {
    return Object.values(RestaurantCategory).map((category) => {
      return `<option value="${category}">${category}</option>`;
    });
  }

  private getFilterName() {
    return Object.values(Sort).map((filter) => {
      return `<option value="${filter}">${filter}</option>`;
    });
  }

  private render() {
    this.innerHTML = `
      <section class="restaurant-filter-container">
        <select name="category" id="category-filter" class="restaurant-filter">
          <option value="전체">전체</option>
          ${this.getRestaurantCategoryName()}
        </select>

        <!-- 정렬 셀렉트 박스 -->
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          ${this.getFilterName()}
        </select>
      </section>
      `;
  }
}

customElements.define('select-box-section', SelectBoxSection);
