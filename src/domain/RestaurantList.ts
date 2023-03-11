import { Restaurant, Category } from '../type/Restaurant';

type SortCondition = '이름' | '거리';

type FilterCategory = '전체' | Category;

class RestaurantList {
  constructor(private list: Restaurant[] = []) {}

  add = (restaurant: Restaurant) => {
    this.list.push(restaurant);
  };

  getByCategory = (category: FilterCategory) =>
    category === '전체'
      ? this.list
      : this.list.filter((restaurant) => restaurant.category === category);

  getFavoriteList = () => this.list.filter((restaurant) => restaurant.isFavorite);

  sortByName = (list: Restaurant[]) => [...list].sort((a, b) => a.name.localeCompare(b.name));

  sortByDistance = (list: Restaurant[]) => [...list].sort((a, b) => a.distance - b.distance);
}

export { SortCondition, FilterCategory, RestaurantList };
