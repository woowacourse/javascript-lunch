import { Category, SortOrder } from '../../../enum/enums';
import { $ } from '../../../util/domSelector';

class SelectBoxSection extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEvent();
  }

  private addEvent() {
    $('#category-filter').addEventListener('change', this.dispatchChangeCategoryEvent.bind(this));
    $('#sorting-filter').addEventListener('change', this.dispatchChangeSortOrder.bind(this));
  }

  private dispatchChangeCategoryEvent(event: Event) {
    this.dispatchEvent(
      new CustomEvent('changeCategory', {
        detail: (event.target as HTMLSelectElement).value,
      }),
    );
  }

  private dispatchChangeSortOrder(event: Event) {
    this.dispatchEvent(
      new CustomEvent('changeSortOrder', {
        detail: (event.target as HTMLSelectElement).value,
      }),
    );
  }

  private createSelectBox(type: object) {
    return Object.values(type).map((option) => `<option value="${option}">${option}</option>`);
  }

  private render() {
    this.innerHTML = `
      <section class="restaurant-filter-container">
        <select name="category" id="category-filter" class="restaurant-filter">
          <option value="전체">전체</option>
          ${this.createSelectBox(Category)}
        </select>

        <!-- 정렬 셀렉트 박스 -->
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          ${this.createSelectBox(SortOrder)}
        </select>
      </section>
      `;
  }
}

customElements.define('select-box-section', SelectBoxSection);
