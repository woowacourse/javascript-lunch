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
    this.updateFilterItem();
  }

  changeSorting() {
    const filterOption = document.querySelector("select[name=sorting]").value;
    this.#sortingFilter = filterOption;
    this.updateFilterItem();
  }

  updateFilterItem() {
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
      return a.name > a.name;
    }
    if (this.#sortingFilter === "거리순") {
      return a.distance.match(/\d+/)[0] > b.distance.match(/\d+/)[0];
    }
  }

  // getCategoryFilter() {
  //   const filterOption = document.querySelector("select[name=category]").value;
  //   this.#categoryFilter = filterOption;
  //   // console.log("category : ", filterOption);
  // }

  // getSortingFilter() {
  //   const filterOption = document.querySelector("select[name=sorting]").value;
  //   this.#sortingFilter = filterOption;
  //   // console.log("sorting", filterOption);
  // }
}
