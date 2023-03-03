import Restaurant, { CategoryAll, SortTypeAll } from './Restaurant';
import { filterByCategory, sortByType } from '../../utils/domain/';

class RestaurantList {
  #list: Restaurant[] = [];

  constructor() {}

  add(restaurant: Restaurant): void {
    this.#list.push(restaurant);
  }

  getList(category: CategoryAll, type: SortTypeAll): Restaurant[] {
    if (category === '전체') {
      return sortByType(this.#list, type);
    }
    const filteredCategory = filterByCategory(this.#list, category);
    return sortByType(filteredCategory, type);
  }
}

export default RestaurantList;
