import { Iall, Icategory } from "../types/category";
import { IsortType } from "../types/sort";

class FilterStateStore {
  #filterState: {
    filter: Icategory | Iall;
    sort: IsortType;
  } = {
    filter: "전체",
    sort: "name",
  };

  setFilterType(filter: Icategory | Iall) {
    this.#filterState.filter = filter;
  }

  setSortType(sort: IsortType) {
    this.#filterState.sort = sort;
  }

  getFilterInfo() {
    return this.#filterState;
  }
}

const filterState = new FilterStateStore();

export default filterState;
