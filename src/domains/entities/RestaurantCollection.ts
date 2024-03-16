import { CONDITIONS } from '@/constants/Condition';
import { Category, CategoryOrAll, IRestaurant } from '../../types/Restaurant';
import Restaurant from './Restaurant';

class RestaurantCollection {
  restaurantList: Restaurant[];

  constructor(restaurants: IRestaurant[]) {
    this.restaurantList = restaurants.map((restaurant: IRestaurant) => new Restaurant(restaurant));
  }

  get() {
    return this.restaurantList.map((restaurant) => restaurant.get());
  }

  filterByCategory(category: CategoryOrAll) {
    if (category === '전체') return this.restaurantList.map((restaurant) => restaurant.get());
    return this.restaurantList
      .map((restaurant) => restaurant.get())
      .filter((restaurant) => restaurant.category === category);
  }

  sort(sortCriteria: keyof typeof CONDITIONS.SORT_CRITERION) {
    if (sortCriteria === '이름순') return this.sortByName();
    return this.sortByDistance();
  }

  sortByName() {
    return this.restaurantList
      .map((restaurant) => restaurant.get())
      .toSorted((a: IRestaurant, b: IRestaurant) => a.name.localeCompare(b.name));
  }

  sortByDistance() {
    return this.restaurantList
      .map((restaurant) => restaurant.get())
      .toSorted((a: IRestaurant, b: IRestaurant) => a.distance - b.distance);
  }

  addRestaurant(restaurantArg: IRestaurant) {
    if (this.has(restaurantArg)) {
      throw new Error('[ERROR] 이미 존재하는 음식점입니다.');
    }
    this.restaurantList.push(new Restaurant(restaurantArg));
  }

  has(newRestaurant: IRestaurant) {
    return this.restaurantList.some((restaurant) => restaurant.isEqual(newRestaurant));
  }

  remove(newRestaurant: IRestaurant) {
    return this.restaurantList.filter((restaurant) => !restaurant.isEqual(newRestaurant));
  }
}

export default RestaurantCollection;
