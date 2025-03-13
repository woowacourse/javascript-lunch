import { CATEGORIES, SORTING } from '../constants/options';

function Select() {
  return `
    <!-- 카테고리/정렬 필터 -->
      <section class="restaurant-filter-container">
        <select name="category" id="category-filter" class="restaurant-filter">
          ${CATEGORIES.map(
            (category) =>
              `<option value="${category.value}">${category.label}</option>`
          ).join('')}
        </select>

        <!-- 정렬 셀렉트 박스 -->
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          ${SORTING.map(
            (sorting) =>
              `<option value="${sorting.value}">${sorting.label}</option>`
          ).join('')}
        </select>
      </section>
  `;
}

export default Select;
