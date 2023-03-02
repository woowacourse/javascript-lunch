import type {
  CategoryOption,
  Restaurant,
  SortOption,
} from "../types/restaurant";

class Restaurants {
  #list;

  constructor(list: Restaurant[]) {
    this.#list = list;
  }

  getList(showState: { filter: CategoryOption; sort: SortOption }) {
    const filteredList = this.filterByCategory(showState.filter);
    const sortedList = this.sortList(filteredList, showState.sort);

    return sortedList;
  }

  add(restaurant: Restaurant) {
    this.#list = [...this.#list, restaurant];
  }

  sortList(restaurantList: Restaurant[], sortOption: SortOption) {
    return [...restaurantList].sort((first, second) =>
      first[sortOption] > second[sortOption] ? 1 : -1
    );
  }

  filterByCategory(category: CategoryOption) {
    if (category === "전체") return [...this.#list];

    return this.#list.filter((restaurant) => restaurant.category === category);
  }
}

export default Restaurants;
