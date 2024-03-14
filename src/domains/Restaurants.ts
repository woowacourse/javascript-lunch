import initialData from '../data/initialData.json';
import { DEFAULT, STORAGE_KEY } from '../constants/rules';

type Category = '전체' | '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
type Sorting = 'distance' | 'name';
type Minutes = 5 | 10 | 15 | 20 | 30;

interface Restaurant {
  category: Category;
  name: string;
  walkingTimeFromCampus: Minutes;
  description?: string;
  referenceLink?: string;
}

export default class Restaurants {
  #storage;

  constructor(storage: Storage) {
    this.#storage = storage;
    this.#initStorage();
  }

  #initStorage() {
    if (!this.#storage.getItem(STORAGE_KEY.restaurantData)) {
      this.#storage.setItem(STORAGE_KEY.restaurantData, JSON.stringify(initialData));
      this.#storage.setItem(STORAGE_KEY.sortingFilter, DEFAULT.sortingFilter);
      this.#storage.setItem(STORAGE_KEY.categoryFilter, DEFAULT.categoryFilter);
    }
  }

  #filterByCategory(category: Category) {
    return this.storageData.filter((restaurant: Restaurant) => restaurant.category === category);
  }

  addRestaurant(restaurant: Restaurant) {
    this.#storage.setItem(
      STORAGE_KEY.restaurantData,
      JSON.stringify([restaurant, ...this.storageData]),
    );
  }

  #orderByDistance(restaurants: Restaurant[]) {
    return restaurants.toSorted((prev, next) => {
      const compareWalkingTime = prev.walkingTimeFromCampus - next.walkingTimeFromCampus;
      return compareWalkingTime || prev.name.localeCompare(next.name);
    });
  }

  #orderByName(restaurants: Restaurant[]) {
    return restaurants.toSorted((prev: Restaurant, next: Restaurant) =>
      prev.name.localeCompare(next.name),
    );
  }

  #sortByStandard(restaurants: Restaurant[], sorting: Sorting) {
    if (sorting && sorting === 'distance') return this.#orderByDistance(restaurants);
    if (sorting && sorting === 'name') return this.#orderByName(restaurants);

    return this.storageData;
  }

  getRestaurant(name: string) {
    return this.storageData.find((restaurant) => restaurant.name === name);
  }

  deleteRestaurant(name: string) {
    const filteredRestaurants = this.storageData.filter((restaurant) => restaurant.name !== name);

    this.#storage.setItem(STORAGE_KEY.restaurantData, JSON.stringify(filteredRestaurants));
  }

  get storageData(): Restaurant[] {
    return JSON.parse(this.#storage.getItem(STORAGE_KEY.restaurantData) || '[]');
  }

  get standardList() {
    const sorting =
      (this.#storage.getItem(STORAGE_KEY.sortingFilter) as Sorting) ?? DEFAULT.sortingFilter;
    const category =
      (this.#storage.getItem(STORAGE_KEY.categoryFilter) as Category) ?? DEFAULT.sortingFilter;
    const restaurants =
      category === DEFAULT.categoryFilter ? this.storageData : this.#filterByCategory(category);

    return this.#sortByStandard(restaurants, sorting);
  }

  set standard(value: { id: string; standard: string }) {
    this.#storage.setItem(value.id, value.standard);
  }
}
