import { Category, SortCondition } from '../data/type';
import Restaurant from './Restaurant';

class RestaurantList {
  constructor(private list: Restaurant[] = []) {}

  add(restaurant: Restaurant) {
    this.list.push(restaurant);
  }

  getList(condition: SortCondition, category?: Category) {
    return this.sortByCondition(this.filterByCategory(category), condition);
  }

  private filterByCategory(category?: Category) {
    return this.list.filter((restaurant) => restaurant.category === category);
  }

  private sortByCondition(list: Restaurant[], condition: SortCondition) {
    return condition === '거리'
      ? [...list].sort((a, b) => a.distance - b.distance)
      : [...list].sort();
  }
}
