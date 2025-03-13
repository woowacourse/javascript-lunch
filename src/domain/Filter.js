import {
  convertStorageToLocal,
  getStorageFoodList,
} from "./handler/FoodItemHandler";

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
    this.#updateFilterItem();
  }

  changeSorting() {
    const filterOption = document.querySelector("select[name=sorting]").value;
    this.#sortingFilter = filterOption;
    this.#updateFilterItem();
  }

  #updateFilterItem() {
    const FoodInventory = getStorageFoodList();
    const foodItems = [...FoodInventory];
    const filteredItems = foodItems
      .filter((foodItem) => {
        if (this.#categoryFilter === "전체") return foodItem;
        return foodItem.imgAlt === this.#categoryFilter;
      })
      .sort((a, b) => this.sortBy(a, b));
    convertStorageToLocal(filteredItems);
    return filteredItems;
    // console.log(filteredItems);
  }

  sortBy(a, b) {
    if (this.#sortingFilter === "이름순") {
      return a.name.localeCompare(b.name, "ko"); // 문자열 비교 (한글 정렬 지원)
    }
    if (this.#sortingFilter === "거리순") {
      return Number(a.distance) - Number(b.distance); // 숫자 정렬
    }
    return 0; // 기본적으로 변화 없음
  }

  reset() {
    document.querySelector("#category-filter").value = "전체";
    document.querySelector("#sorting-filter").value = "이름순";
    this.#categoryFilter = "전체";
    this.#sortingFilter = "이름순";
  }
}
