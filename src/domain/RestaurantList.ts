import { Restaurant, Category } from '../type/Restaurant';

type SortCondition = '이름' | '거리';

type FilterCategory = '전체' | Category;

class RestaurantList {
  private list: Restaurant[] = [];

  constructor() {}

  add(restaurant: Restaurant) {
    this.list.push(restaurant);
  }

  getList(category: FilterCategory, condition: SortCondition) {
    return this.sortByCondition(this.filterByCategory(category), condition);
  }

  private filterByCategory(category: FilterCategory) {
    return category === '전체'
      ? this.list
      : this.list.filter((restaurant) => restaurant.category === category);
  }

  private sortByCondition(list: Restaurant[], condition: SortCondition) {
    return condition === '거리'
      ? [...list].sort((a, b) => a.distance - b.distance)
      : [...list].sort((a, b) => a.name.localeCompare(b.name));
  }
}

export { SortCondition, FilterCategory, RestaurantList };
