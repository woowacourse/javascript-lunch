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

  add(restaurant: Restaurant): Restaurant[] {
    this.#restaurantList.push(restaurant);
    return this.#restaurantList;
  }

  delete(restaurantName: string): Restaurant[] {
    this.#restaurantList = this.#restaurantList.filter((restaurant) => restaurant.getName() !== restaurantName);
    return this.#restaurantList;
  }

  updateLike(restaurantName: string, like: boolean): Restaurant[] {
    const restaurant = this.#restaurantList.find((restaurant) => restaurant.getName() === restaurantName);

    if (restaurant) {
      restaurant.setLike(like);
    }

    return this.#restaurantList;
  }

  filter(options: FilterOptions = {}): Restaurant[] {
    const { category, sorting, header } = options;
    let filteredList = [...this.#restaurantList];

    if (category) {
      filteredList = filteredList.filter((restaurant) => restaurant.getCategory() === category);
    }

    if (header === '자주 가는 음식점') {
      filteredList = filteredList.filter((restaurant) => restaurant.getLike() === true);
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
