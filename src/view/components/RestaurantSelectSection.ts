import {
  CATEGORIES,
  SORTING_STANDARDS,
  SORTING_STANDARD_MAPPER,
} from "../../constants";
import { Category, SortingStandard } from "../../types";

class RestaurantSelectSection {
  renderInit() {
    return /*html*/ `
      <section
      class="restaurant-filter-container"
      id="restaurant-filter-container"
      >
        <select name="category" id="category-filter" class="restaurant-filter">
          <option value="전체">전체</option>
          ${CATEGORIES.map(
            (category) => `<option value="${category}">${category}</option>`
          ).join()}
        </select>

        <!-- 정렬 셀렉트 박스 -->
        <select
          name="sorting"
          id="sorting-filter"
          class="restaurant-filter"
        >
            ${SORTING_STANDARDS.map(
              (sortingStandard) =>
                `<option value="${sortingStandard}">${SORTING_STANDARD_MAPPER[sortingStandard]}</option>`
            ).join()}
        </select>
      </section>

      `;
  }

  getFilterValues(): {
    category: Category | "전체";
    sortingStandard: SortingStandard;
  } {
    const $sortingFilter =
      document.querySelector<HTMLSelectElement>("#sorting-filter");
    const $categoryFilter =
      document.querySelector<HTMLSelectElement>("#category-filter");
    return {
      category: $categoryFilter?.value as Category | "전체",
      sortingStandard: $sortingFilter?.value as SortingStandard,
    };
  }

  setEvent(type: string, listener: (event: Event) => void) {
    const $restaurantFilterContainer = document.querySelector<HTMLDivElement>(
      "#restaurant-filter-container"
    );

    $restaurantFilterContainer?.addEventListener(type, listener);
  }
}

export default RestaurantSelectSection;
