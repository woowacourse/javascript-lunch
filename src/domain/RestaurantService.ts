import { Category, DistanceTime, Sort } from '../constants';

export interface Restaurant {
  id: string;
  category: Category;
  distance: DistanceTime;
  name: string;
  description?: string;
  link?: string;
  isFavorite?: Boolean;
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

    this.filterRestaurantList();
  }

  getRestaurant() {
    return [...this.#restaurants];
  }

  getFilteredRestaurant() {
    return [...this.#filtered];
  }

  getFavoriteRestaurant() {
    const favoriteRestaurants = this.#restaurants.filter((restaurant) => restaurant.isFavorite);

    return this.sortByName(favoriteRestaurants);
  }

  filterByCategory(restaurants: Restaurant[], category: Category | '전체'): Restaurant[] {
    if (category === '전체') {
      return this.#restaurants;
    }

    return restaurants.filter((restaurant) => restaurant.category === category);
  }

  sortByName(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((a, b) => a.name.localeCompare(b.name) || a.distance - b.distance);
  }

  sortByDistance(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((a, b) => a.distance - b.distance || a.name.localeCompare(b.name));
  }

  addRestaurant({ category, distance, name, description, link, isFavorite }: Restaurant) {
    this.#restaurants = [
      ...this.#restaurants,
      {
        id: String(Date.now()),
        category,
        distance,
        name,
        description,
        link,
        isFavorite: isFavorite ?? false,
      },
    ];
  }

  filterRestaurantList() {
    const filtered = this.filterByCategory(this.#restaurants, this.category);

    if (this.sort === '이름순') this.#filtered = this.sortByName(filtered);
    if (this.sort === '거리순') this.#filtered = this.sortByDistance(filtered);
  }

  getById(id: string) {
    return this.#restaurants.find((restaurant) => restaurant.id === id);
  }

  updateFavorite(id: string, isFavorite: Boolean) {
    const restaurant = this.getById(id);

    if (restaurant) {
      restaurant.isFavorite = isFavorite;
    }
  }

  deleteRestaurant(id: string) {
    const restaurant = this.getById(id);

    if (restaurant) {
      this.#restaurants = this.#restaurants.filter((restaurant) => restaurant.id !== id);
      this.filterRestaurantList();
    }
  }
}
