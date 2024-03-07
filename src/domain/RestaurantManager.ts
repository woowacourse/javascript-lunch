type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

type Option = 'name' | 'distance';

interface Restaurant {
  category: Category;
  name: string;
  distance: 5 | 10 | 15 | 20 | 30;
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

  add(restaurant: Restaurant): void {
    this.#restaurants.push(restaurant);
  }

  filteredAndSortedByOptions(category: Category, option: Option) {
    const filteredRestaurant = this.#filterByCategory(category);

    if (option === 'name') return this.#sortByName(filteredRestaurant);

    if (option === 'distance') return this.#sortByDistance(filteredRestaurant);
  }

  #filterByCategory(category: Category): Restaurant[] {
    return this.#restaurants.filter((restaurant) => restaurant.category === category);
  }

  #sortByName(restaurants: Restaurant[]): Restaurant[] {
    return restaurants.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }

  #sortByDistance(restaurants: Restaurant[]): Restaurant[] {
    return restaurants.sort((a, b) => {
      if (a.distance > b.distance) return 1;
      if (a.distance < b.distance) return -1;
      return 0;
    });
  }
}

export default RestaurantManager;
