import type { CategoryOption, SortOption } from "../types/option";
import type { Restaurant } from "../types/restaurant";

class Restaurants {
  #list;

  constructor(list: Restaurant[]) {
    this.#list = list;
  }

  getList() {
    return this.#list;
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

  getRestaurantById(restaurantId: string) {
    return this.#list.find((restaurant) => restaurant.id === restaurantId);
  }

  add(restaurant: Restaurant) {
    this.#list = [...this.#list, restaurant];
  }

  sortBySortOption(restaurantList: Restaurant[], sortOption: SortOption) {
    if (sortOption === "distance")
      return [...restaurantList].sort((first, second) =>
        Number(first[sortOption]) > Number(second[sortOption]) ? 1 : -1
      );
    return [...restaurantList].sort((first, second) =>
      first[sortOption] > second[sortOption] ? 1 : -1
    );
  }

  filterByCategory(restaurantList: Restaurant[], category: CategoryOption) {
    if (category === "전체") return [...restaurantList];

    return [...restaurantList].filter(
      (restaurant) => restaurant.category === category
    );
  }

  filterByLike(likeOption: boolean) {
    if (likeOption)
      return this.#list.filter((restaurant) => `${restaurant.like}` === "true");
    return this.#list;
  }

  toggleLike(restaurantId: string) {
    this.#list = this.#list.map((restaurant) => {
      if (restaurant.id === restaurantId)
        return { ...restaurant, like: !restaurant.like };
      return restaurant;
    });
  }

  removeById(restaurantId: string) {
    this.#list = this.#list.filter(
      (restaurant) => restaurant.id !== restaurantId
    );
  }
}

export default Restaurants;
