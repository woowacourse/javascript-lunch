import { Category, DistanceTime, Sort } from '../constants';

export interface Restaurant {
  category: Category;
  distance: DistanceTime;
  name: string;
  description?: string;
  url?: string;
}

export default class RestaurantService {
  #restaurants: Restaurant[];
  #filtered: Restaurant[];
  category: Category | '전체';
  sort: Sort;

  constructor(restaurants: Restaurant[] = []) {
    this.#restaurants = restaurants;
    this.#filtered = restaurants;
    this.category = '전체';
    this.sort = '이름순';
  }

  getRestaurant() {
    return [...this.#restaurants];
  }

  getFilteredRestaurant() {
    return [...this.#filtered];
  }

  filterByCategory(restaurants: Restaurant[], category: Category | '전체'): Restaurant[] {
    if (category === '전체') {
      return this.#restaurants;
    }

    return restaurants.filter((restaurant) => restaurant.category === category);
  }

  sortByName(restaurants: Restaurant[]): Restaurant[] {
    const nameSortedRestaurants = [...restaurants].sort((a, b) => {
      if (a.name.localeCompare(b.name) === 0) return a.distance - b.distance;

      return a.name.localeCompare(b.name);
    });

    return nameSortedRestaurants;
  }

  sortByDistance(restaurants: Restaurant[]): Restaurant[] {
    const distanceSortedRestaurants = [...restaurants].sort((a, b) => {
      if (a.distance - b.distance === 0) return a.name.localeCompare(b.name);

      return a.distance - b.distance;
    });

    return distanceSortedRestaurants;
  }

  addRestaurant({ category, distance, name, description, url }: Restaurant) {
    this.#restaurants = [...this.#restaurants, { category, distance, name, description, url }];
  }

  filterRestaurantList() {
    const filtered = this.filterByCategory(this.#restaurants, this.category);

    if (this.sort === '이름순') this.#filtered = this.sortByName(filtered);
    if (this.sort === '거리순') this.#filtered = this.sortByDistance(filtered);
  }
}
