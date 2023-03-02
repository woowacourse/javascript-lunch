import { Category, SortCondition } from '../data/type';
import Restaurant from './Restaurant';

class RestaurantList {
  private list: Restaurant[];

  constructor(initList: Restaurant[]) {
    this.list = initList;
  }

  add(restaurant: Restaurant) {
    this.list.push(restaurant);
  }

  getList(condition: SortCondition, category?: Category) {
    return this.sortByCondition(this.filterByCategory(category), condition);
  }

  private filterByCategory(category?: Category) {
    return category
      ? this.list.filter((restaurant) => restaurant.category === category)
      : this.list;
  }

  private sortByCondition(list: Restaurant[], condition: SortCondition) {
    return condition === '거리'
      ? [...list].sort((a, b) => a.distance - b.distance)
      : [...list].sort();
  }
}

export default RestaurantList;
