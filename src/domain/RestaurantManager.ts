import getUniqueID from '../utils/getUniqueID';

type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타' | '전체';
type Distance = 5 | 10 | 15 | 20 | 30;
type Option = 'name' | 'distance';

interface Restaurant {
  id: number;
  name: string;
  isBookmark: boolean;
  category: Category;
  distance: Distance;
  description?: string;
  link?: string;
}

class RestaurantManager {
  #restaurants: Restaurant[] = [];

  get restaurants(): Restaurant[] {
    return [...this.#restaurants];
  }

  set restaurants(restaurants: Restaurant[]) {
    this.#restaurants = restaurants ?? [];
  }

  add(restaurant: Omit<Restaurant, 'id' | 'isBookmark'>): void {
    this.#restaurants.push({ id: getUniqueID(), isBookmark: false, ...restaurant });
  }

  update(restaurant: Restaurant): void {
    const idx = this.#restaurants.findIndex((prevRestaurant) => prevRestaurant.id === restaurant.id);
    this.#restaurants[idx] = { ...restaurant };
  }

  getList(options: { category: Category; sort: Option }, isBookmark: boolean): Restaurant[] | void {
    const restaurants = isBookmark ? this.#filterByBookmark() : this.restaurants;
    const filteredRestaurants = this.#filterByCategory(restaurants, options.category);

    return this.#sortByOption(filteredRestaurants, options.sort);
  }

  #filterByBookmark(): Restaurant[] {
    return this.restaurants.filter((restaurant) => restaurant.isBookmark);
  }

  #filterByCategory(restaurants: Restaurant[], category: Category): Restaurant[] {
    if (category === '전체') return restaurants;
    return restaurants.filter((restaurant) => restaurant.category === category);
  }

  #sortByOption(restaurants: Restaurant[], sort: Option): Restaurant[] | void {
    if (sort === 'name') return this.#sortByName(restaurants);
    if (sort === 'distance') return this.#sortByDistance(restaurants);
  }

  #sortByName(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
  }

  #sortByDistance(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((a, b) => a.distance - b.distance);
  }
}

export default RestaurantManager;
