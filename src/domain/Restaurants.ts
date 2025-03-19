import Restaurant, { Category } from './Restaurant';
import { LIKE_HEADER_STATE } from '../components/LikeHeader';

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

    filteredList = filteredList
      .filter((restaurant) => {
        if (category && restaurant.getCategory() !== category) return false;
        if (header === LIKE_HEADER_STATE.LIKE && restaurant.getIsLiked() !== true) return false;
        return true;
      })
      .sort((a, b) => {
        if (sorting === 'name') return a.getName().localeCompare(b.getName());
        if (sorting === 'distance') Number(a.getDistance()) - Number(b.getDistance());
        return 0;
      });

    return filteredList;
  }
}

export default Restaurants;
