import type { Category, Restaurant } from "../types/restaurant";

class Restaurants {
  #list;

  constructor(list: Restaurant[]) {
    this.#list = list;
  }

  getList(showState: { filter: Category | "전체"; sort: "거리순" | "이름순" }) {
    const filteredList = this.filterByCategory(showState.filter);
    const sortedList = this.sortList(filteredList, showState.sort);

    return sortedList;
  }

  add(restaurant: Restaurant) {
    this.#list = [...this.#list, restaurant];
  }

  sortByName() {
    return [...this.#list].sort((first, second) =>
      first.name > second.name ? 1 : -1
    );
  }

  sortByDistance() {
    return [...this.#list].sort(
      (first, second) => first.distance - second.distance
    );
  }

  sortList(filteredList: Restaurant[], sortingStandard: "거리순" | "이름순") {
    if (sortingStandard === "거리순")
      return [...filteredList].sort(
        (first, second) => first.distance - second.distance
      );
    return [...filteredList].sort((first, second) =>
      first.name > second.name ? 1 : -1
    );
  }

  filterByCategory(category: Category | "전체") {
    if (category === "전체") return [...this.#list];

    return this.#list.filter((restaurant) => restaurant.category === category);
  }
}

export default Restaurants;
