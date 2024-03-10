import { Category, SortOrder } from '../../../enum/enums';
import { $ } from '../../../util/domSelector';

class SelectBoxSection extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEvent();
  }

  private addEvent() {
    $('#category-filter').addEventListener('change', (event: Event) => {
      this.dispatchEvent(
        new CustomEvent('changeCategory', {
          detail: (event.target as HTMLSelectElement).value,
        }),
      );
    });

    $('#sorting-filter').addEventListener('change', (event: Event) => {
      this.dispatchEvent(
        new CustomEvent('changeSortOrder', {
          detail: (event.target as HTMLSelectElement).value,
        }),
      );
    });
  }

  private getCategoryName() {
    return Object.values(Category).map((category) => {
      return `<option value="${category}">${category}</option>`;
    });
  }

  private getSortOrderName() {
    return Object.values(SortOrder).map((sortOrder) => {
      return `<option value="${sortOrder}">${sortOrder}</option>`;
    });
  }

  private render() {
    this.innerHTML = `
      <section class="restaurant-filter-container">
        <select name="category" id="category-filter" class="restaurant-filter">
          <option value="전체">전체</option>
          ${this.getCategoryName()}
        </select>

        <!-- 정렬 셀렉트 박스 -->
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          ${this.getSortOrderName()}
        </select>
      </section>
      `;
  }
}

customElements.define('select-box-section', SelectBoxSection);
