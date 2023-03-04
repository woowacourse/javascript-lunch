import { filterByCategory, sortByType } from '../../utils/domain/';

type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

export type CategoryAll = '전체' | Category;

export type SortTypeAll = 'name' | 'distance';

type Distance = 5 | 10 | 15 | 20 | 30;

export interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

class RestaurantList {
  #list: Restaurant[] = [];

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
