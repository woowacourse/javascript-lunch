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
      .filter((restaurant) => restaurant.get().category === category)
      .map((restaurant) => restaurant.get());
  }

  sort(sortCriteria: keyof typeof CONDITIONS.SORT_CRITERION) {
    if (sortCriteria === '이름순') return this.sortByName();
    return this.sortByDistance();
  }

  sortByName() {
    return this.restaurantList
      .sort((a, b) => a.get().name.localeCompare(b.get().name))
      .map((restaurant) => restaurant.get());
  }

  sortByDistance() {
    return this.restaurantList
      .sort((a, b) => a.get().distance - b.get().distance)
      .map((restaurant) => restaurant.get());
  }

  addRestaurant(restaurantArg: IRestaurant) {
    const restaurants = this.restaurantList.map((restaurant) => {
      return JSON.stringify(restaurant.get());
    });
    if (restaurants.includes(JSON.stringify(restaurantArg))) {
      throw new Error('[ERROR] 이미 존재하는 음식점입니다.');
    }
    const restaurant = new Restaurant(restaurantArg);
    this.restaurantList.push(restaurant);
  }
}

export default RestaurantCollection;
