import { Iall, Icategory, IsortType } from '../types';

class FilterStateStore {
  #filterState: {
    filter: Icategory | Iall;
    sort: IsortType;
  } = {
    filter: '전체',
    sort: 'name',
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