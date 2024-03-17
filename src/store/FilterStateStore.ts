import { Iall, Icategory } from "../types/category";
import { IsortType } from "../types/sort";

class FilterStateStore {
  #filterState: {
    filter: Icategory | Iall;
    sort: IsortType;
    liked: boolean;
  } = {
    filter: "전체",
    sort: "name",
    liked: false,
  };

  setFilterType(filter: Icategory | Iall) {
    this.#filterState.filter = filter;
  }

  setSortType(sort: IsortType) {
    this.#filterState.sort = sort;
  }

  setLikedType(liked: boolean) {
    this.#filterState.liked = liked;
  }

  getFilterInfo() {
    return this.#filterState;
  }
}

const filterState = new FilterStateStore();

export default filterState;
