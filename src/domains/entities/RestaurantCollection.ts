import { CONDITIONS } from '@/constants/Condition';
import { Category, CategoryOrAll, IRestaurant } from '../../types/Restaurant';
import Restaurant from './Restaurant';

class RestaurantCollection {
  restaurants: Restaurant[];

  constructor(restaurants: IRestaurant[]) {
    this.restaurants = restaurants.map((restaurant: IRestaurant) => new Restaurant(restaurant));
  }

  get() {
    return this.restaurants.map((restaurant) => restaurant.get());
  }

  filterByCategory(category: CategoryOrAll) {
    if (category === '전체') return this.restaurants.map((restaurant) => restaurant.get());
    return this.restaurants
      .map((restaurant) => restaurant.get())
      .filter((restaurant) => restaurant.category === category);
  }

  sort(sortCriteria: keyof typeof CONDITIONS.SORT_CRITERION) {
    if (sortCriteria === '이름순') return this.sortByName();
    return this.sortByDistance();
  }

  sortByName() {
    return this.restaurants
      .map((restaurant) => restaurant.get())
      .toSorted((a: IRestaurant, b: IRestaurant) => a.name.localeCompare(b.name));
  }

  sortByDistance() {
    return this.restaurants
      .map((restaurant) => restaurant.get())
      .toSorted((a: IRestaurant, b: IRestaurant) => a.distance - b.distance);
  }

  add(restaurant: IRestaurant) {
    if (this.has(restaurant)) {
      throw new Error('[ERROR] 이미 존재하는 음식점입니다.');
    }
    this.restaurants.push(new Restaurant(restaurant));
    return this.get();
  }

  has(newRestaurant: IRestaurant) {
    return this.restaurants.some((restaurant) => restaurant.isEqual(newRestaurant));
  }

  remove(newRestaurant: IRestaurant) {
    return this.restaurants
      .filter((restaurant) => !restaurant.isEqual(newRestaurant))
      .map((restaurant) => restaurant.get());
  }

  update(newRestaurant: IRestaurant) {
    return new RestaurantCollection(this.remove(newRestaurant)).add(newRestaurant);
  }
}

export default RestaurantCollection;
