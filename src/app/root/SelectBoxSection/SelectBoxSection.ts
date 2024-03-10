import { TYPE_SETTING } from '../../../constants/setting';
import { $ } from '../../../utils/domSelector';

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
        new CustomEvent('changeSort', {
          detail: (event.target as HTMLSelectElement).value,
        }),
      );
    });
  }

  private getCategoryName() {
    return TYPE_SETTING.category.map((category) => {
      return `<option value="${category}">${category}</option>`;
    });
  }

  private getFilterName() {
    return TYPE_SETTING.sort.map((filter) => {
      return `<option value="${filter}">${filter}</option>`;
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
          ${this.getFilterName()}
        </select>
      </section>
      `;
  }
}

customElements.define('select-box-section', SelectBoxSection);
