import type { CategoryOption, LikeOption, SortOption } from "../types/option";
import type { Restaurant } from "../types/restaurant";

class Restaurants {
  #list;

  constructor(list: Restaurant[]) {
    this.#list = list;
  }

  getListByOption(showState: {
    filter: CategoryOption;
    sort: SortOption;
    like: boolean;
  }) {
    const likeFilteredList = this.filterByLike(showState.like);
    const categoryFilteredList = this.filterByCategory(
      likeFilteredList,
      showState.filter
    );
    const sortedList = this.sortBySortOption(
      categoryFilteredList,
      showState.sort
    );

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

  filterByCategory(restaurantList: Restaurant[], category: CategoryOption) {
    if (category === "전체") return [...this.#list];

    return [...restaurantList].filter(
      (restaurant) => restaurant.category === category
    );
  }

  filterByLike(likeOption: boolean) {
    return likeOption
      ? this.#list.filter((restaurant) => restaurant.like)
      : this.#list;
  }
}

export default Restaurants;
