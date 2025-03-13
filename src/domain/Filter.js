import { readStorageFoodList } from "./handler/FoodStorageHandler";

export class Filter {
  #categoryFilter;
  #sortingFilter;

  constructor() {
    this.#categoryFilter = "전체";
    this.#sortingFilter = "이름순";
  }

  changeCategory() {
    const filterOption = document.querySelector("select[name=category]").value;
    this.#categoryFilter = filterOption;
    return this.#updateFilterItem();
  }

  changeSorting() {
    const filterOption = document.querySelector("select[name=sorting]").value;
    this.#sortingFilter = filterOption;
    return this.#updateFilterItem();
  }

  #updateFilterItem() {
    const FoodInventory = readStorageFoodList();
    const foodItems = [...FoodInventory];
    const filteredItems = foodItems
      .filter((foodItem) => {
        if (this.#categoryFilter === "전체") return foodItem;
        return foodItem.imgAlt === this.#categoryFilter;
      })
      .sort((a, b) => this.sortBy(a, b));
    return filteredItems;
  }

  sortBy(a, b) {
    if (this.#sortingFilter === "이름순") {
      return a.name.localeCompare(b.name, "ko");
    }
    if (this.#sortingFilter === "거리순") {
      return Number(a.distance) - Number(b.distance);
    }
    return 0;
  }

  reset() {
    document.querySelector("#category-filter").value = "전체";
    document.querySelector("#sorting-filter").value = "이름순";
    this.#categoryFilter = "전체";
    this.#sortingFilter = "이름순";
  }
}
