import { Restaurant, Category } from '../type/Restaurant';
import { Validator } from '../util/Validator';

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

  validateRestaurant = (restaurant: Restaurant) => {
    if (Validator.isOnlyWhiteSpace(restaurant.name)) {
      throw new Error('공백만 입력할 수 없습니다.');
    }
    if (this.list.map((element) => element.name).includes(restaurant.name)) {
      throw new Error('이미 존재하는 이름입니다.');
    }
  };

  toggleFavorite = (name: string) => {
    const index = this.list.findIndex((restaurant) => restaurant.name === name);
    this.list[index].isFavorite = !this.list[index].isFavorite;
  };
}

export { SortCondition, FilterCategory, RestaurantList };
