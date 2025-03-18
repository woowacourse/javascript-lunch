import { LIKE_HEADER_TITLE } from '../constant/LikeHeaderTitle';
import Restaurant, { Category } from './Restaurant';

interface FilterOptions {
  category?: Category;
  sorting?: 'name' | 'distance';
  header?: string;
}

class Restaurants {
  #restaurantList: Restaurant[];

  constructor(initialRestaurants: Restaurant[] = []) {
    this.#restaurantList = initialRestaurants;
  }

  getAll(): Restaurant[] {
    return this.#restaurantList;
  }

  add(restaurant: Restaurant): void {
    this.#restaurantList.push(restaurant);
  }

  delete(restaurantName: string): void {
    this.#restaurantList = this.#restaurantList.filter((restaurant) => restaurant.getName() !== restaurantName);
  }

  updateIsLiked(restaurantName: string, isLiked: boolean): void {
    const restaurant = this.#restaurantList.find((restaurant) => restaurant.getName() === restaurantName);

    if (restaurant) {
      restaurant.setIsLiked(isLiked);
    }
  }

  filterAndSort(options: FilterOptions = {}): Restaurant[] {
    const { category, sorting, header } = options;
    let filteredList = [...this.#restaurantList];

    if (category) {
      filteredList = filteredList.filter((restaurant) => restaurant.getCategory() === category);
    }

    if (header === LIKE_HEADER_TITLE.LIKE_RESTAURANTS) {
      filteredList = filteredList.filter((restaurant) => restaurant.getIsLiked() === true);
    }

    if (sorting === 'name') {
      filteredList = filteredList.sort((a, b) => a.getName().localeCompare(b.getName()));
    } else if (sorting === 'distance') {
      filteredList = filteredList.sort((a, b) => Number(a.getDistance()) - Number(b.getDistance()));
    }

    return filteredList;
  }
}

export default Restaurants;
