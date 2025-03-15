import {
  ChangeCategoryType,
  SortByType,
  UpdateFilterItemType,
} from "../types/domain/FilterType";

export class Filter {
  #categoryFilter;
  #sortingFilter;

  constructor() {
    this.#categoryFilter = "전체";
    this.#sortingFilter = "이름순";
  }

  chageFilter({ foodList, filter }: ChangeCategoryType) {
    const filterOption = (
      document.querySelector(`select[name=${filter}]`) as HTMLSelectElement
    )?.value;
    if (filter === "category") this.#categoryFilter = filterOption;
    else this.#sortingFilter = filterOption;
    return this.updateFilterItem({ foodList });
  }

  updateFilterItem({ foodList }: UpdateFilterItemType) {
    const foodItems = [...foodList];
    const filteredItems = foodItems
      ?.filter((foodItem) => {
        if (this.#categoryFilter === "전체") return foodItem;
        return foodItem.imgAlt === this.#categoryFilter;
      })
      .sort((a, b) => this.sortBy({ a, b }));

    return filteredItems || [];
  }

  sortBy({ a, b }: SortByType) {
    if (this.#sortingFilter === "이름순") {
      return a.name.localeCompare(b.name, "ko");
    }
    if (this.#sortingFilter === "거리순") {
      return Number(a.distance) - Number(b.distance);
    }
    return 0;
  }
}
