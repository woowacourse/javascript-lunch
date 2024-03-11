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
        </select>

        <!-- 정렬 셀렉트 박스 -->
        <select
          name="sorting"
          id="sorting-filter"
          class="restaurant-filter"
        ></select>
      </section>

      `;
  }

  renderCategory() {
    const $categoryFilter = document.querySelector(
      "#category-filter"
    ) as HTMLSelectElement;

    const categoryFragment = new DocumentFragment();
    CATEGORIES.forEach((category) => {
      const categoryTag = document.createElement("option");
      categoryTag.value = category;
      categoryTag.textContent = category;
      categoryFragment.append(categoryTag);
    });
    $categoryFilter.appendChild(categoryFragment);
  }

  renderSorting() {
    const $sortingFilter = document.querySelector(
      "#sorting-filter"
    ) as HTMLSelectElement;

    const sortingFragment = new DocumentFragment();
    SORTING_STANDARDS.forEach((sortingStandard) => {
      const sortingStandardTag = document.createElement("option");
      sortingStandardTag.value = sortingStandard;
      sortingStandardTag.textContent = SORTING_STANDARD_MAPPER[sortingStandard];
      sortingFragment.append(sortingStandardTag);
    });
    $sortingFilter.appendChild(sortingFragment);
  }

  getFilterValues(): {
    category: Category | "전체";
    sortingStandard: SortingStandard;
  } {
    const $sortingFilter = document.querySelector(
      "#sorting-filter"
    ) as HTMLSelectElement;
    const $categoryFilter = document.querySelector(
      "#category-filter"
    ) as HTMLSelectElement;
    return {
      category: $categoryFilter.value as Category | "전체",
      sortingStandard: $sortingFilter.value as SortingStandard,
    };
  }

  setEvent(type: string, listener: (event: Event) => void) {
    const $restaurantFilterContainer = document.querySelector(
      "#restaurant-filter-container"
    ) as HTMLDivElement;

    $restaurantFilterContainer.addEventListener(type, listener);
  }
}

export default RestaurantSelectSection;
