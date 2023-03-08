import type { CategoryOption, SortOption } from "../types/option";
import type { Restaurant } from "../types/restaurant";

class Restaurants {
  #list;

  constructor(list: Restaurant[]) {
    this.#list = list;
  }

  getListByOption(showState: { filter: CategoryOption; sort: SortOption }) {
    const filteredList = this.filterByCategory(showState.filter);
    const sortedList = this.sortBySortOption(filteredList, showState.sort);

    return sortedList;
  }

  add(restaurant: Restaurant) {
    this.#list = [...this.#list, restaurant];
  }

  sortBySortOption(restaurantList: Restaurant[], sortOption: SortOption) {
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
