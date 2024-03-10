import { All, Category, SortType } from '../types';

class FilterStateStore {
  #filterState: {
    filter: Category | All;
    sort: SortType;
  } = {
    filter: '전체',
    sort: 'name',
  };

  setFilterType(filter: Category | All) {
    this.#filterState.filter = filter;
  }

  setSortType(sort: SortType) {
    this.#filterState.sort = sort;
  }

  getFilterInfo() {
    return this.#filterState;
  }
}

const filterState = new FilterStateStore();

export default filterState;
