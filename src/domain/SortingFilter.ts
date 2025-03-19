import {
  ChangeCategoryType,
  SortByType,
  SortedFoodListType,
  UpdateFilterItemType,
} from "../types/domain/SortingFilterType";

export class SortingFilter {
  #categoryFilter;
  #sortingFilter;

  constructor() {
    this.#categoryFilter = "전체";
    this.#sortingFilter = "이름순";
  }

  chageFilter({ filterName }: ChangeCategoryType) {
    const filterOption = (
      document.querySelector(`select[name=${filterName}]`) as HTMLSelectElement
    )?.value;
    if (filterName === "category") this.#categoryFilter = filterOption;
    else if (filterName === "sorting") this.#sortingFilter = filterOption;
  }

  filteredFoodList({ foodList }: UpdateFilterItemType) {
    const newfoodList = [...foodList];
    const filteredFoodList = newfoodList
      ?.filter((foodItem) => {
        if (this.#categoryFilter === "전체") return foodItem;
        return foodItem.category === this.#categoryFilter;
      })
      .sort((a, b) => this.#sortByFilter({ a, b }));

    return filteredFoodList || [];
  }

  #sortByFilter({ a, b }: SortByType) {
    if (this.#sortingFilter === "이름순") {
      return a.name.localeCompare(b.name, "ko");
    }
    if (this.#sortingFilter === "거리순") {
      return Number(a.distance) - Number(b.distance);
    }
    return 0;
  }

  sortedFoodList({ foodList }: SortedFoodListType) {
    return (
      this.filteredFoodList({ foodList })?.sort((a, b) =>
        this.#sortByFilter({ a, b })
      ) || []
    );
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
