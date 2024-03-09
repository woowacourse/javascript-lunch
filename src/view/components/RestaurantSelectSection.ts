import {
  categories,
  sortingStandards,
  sortingStandardsMapper,
} from "../../constants";
import { Category, SortingStandard } from "../../types";
import { getRestaurantsFromLocalStorage } from "../../util";

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

    const $frag = this.getOptions(categories);

    $categoryFilter.appendChild($frag);
  }

  renderSorting() {
    const $sortingFilter = document.querySelector(
      "#sorting-filter"
    ) as HTMLSelectElement;

    const $frag = this.getOptions(sortingStandards);

    $sortingFilter.appendChild($frag);
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

  private getOptions(
    options: readonly Category[] | readonly SortingStandard[]
  ) {
    const $frag = new DocumentFragment();

    options.forEach((option) => {
      const $option = document.createElement("option");

      $option.value = option;
      $option.textContent =
        option === "name" || option === "distance"
          ? sortingStandardsMapper[option]
          : option;

      $frag.append($option);
    });

    return $frag;
  }
}

export default RestaurantSelectSection;
