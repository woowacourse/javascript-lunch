import { Iall, Icategory } from "../types/category";
import { IsortType } from "../types/sort";

class FilterStateStore {
  #filterState: {
    filter: Icategory | Iall;
    sort: IsortType;
    fav: boolean;
  } = {
    filter: "전체",
    sort: "name",
    fav: false,
  };

  setFilterType(filter: Icategory | Iall) {
    this.#filterState.filter = filter;
  }

  setSortType(sort: IsortType) {
    this.#filterState.sort = sort;
  }

  setFavType(fav: boolean) {
    this.#filterState.fav = fav;
  }

  getFilterInfo() {
    return this.#filterState;
  }
}

const filterState = new FilterStateStore();

export default filterState;
