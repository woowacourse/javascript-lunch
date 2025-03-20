import {
  ChangeCategoryType,
  SortByType,
  UpdateFilterItemType,
} from "../types/domain/SortingFilterType";

const SORTING_OPTIONS = {
  name: "이름순",
  distance: "거리순",
};

const CATEGORY_OPTIONS = {
  default: "전체",
};

class SortingFilter {
  static instance: SortingFilter;
  #categoryFilter;
  #sortingFilter;

  constructor() {
    this.#categoryFilter = CATEGORY_OPTIONS.default;
    this.#sortingFilter = SORTING_OPTIONS.name;
  }

  static getInstance(): SortingFilter {
    if (!SortingFilter.instance) {
      SortingFilter.instance = new SortingFilter();
    }
    return SortingFilter.instance;
  }

  chageFilter({ filterName }: ChangeCategoryType) {
    const filterOption = (
      document.querySelector(`select[name=${filterName}]`) as HTMLSelectElement
    )?.value;
    if (filterName === "category") this.#categoryFilter = filterOption;
    else if (filterName === "sorting") this.#sortingFilter = filterOption;
  }

  filterAndSortFoodList({ foodList }: UpdateFilterItemType) {
    const resultFoodList = [...foodList]
      ?.filter((foodItem) => {
        if (this.#categoryFilter === CATEGORY_OPTIONS.default) return foodItem;
        return foodItem.category === this.#categoryFilter;
      })
      .sort((a, b) => this.#sortByFilter({ a, b }));

    return resultFoodList || [];
  }

  #sortByFilter({ a, b }: SortByType) {
    if (this.#sortingFilter === SORTING_OPTIONS.name) {
      return a.name.localeCompare(b.name, "ko");
    }
    if (this.#sortingFilter === SORTING_OPTIONS.distance) {
      return Number(a.distance) - Number(b.distance);
    }
    return 0;
  }

  saveCurrentFilter() {
    const categoryFilter = (
      document.querySelector("#category-filter") as HTMLSelectElement
    ).value;
    const sortingFilter = (
      document.querySelector("#sorting-filter") as HTMLSelectElement
    ).value;

    this.#categoryFilter = categoryFilter;
    this.#sortingFilter = sortingFilter;
  }
}

export const sortingFilter = SortingFilter.getInstance();
