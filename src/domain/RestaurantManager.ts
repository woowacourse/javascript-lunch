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

  getList({ category, option }: { category: Category; option: Option }, isBookmark: boolean): Restaurant[] | void {
    const filteredCategoryList = this.#filterByCategory(category);
    const filteredList = isBookmark
      ? filteredCategoryList.filter((restaurant) => restaurant.isBookmark)
      : filteredCategoryList;

    if (option === 'name') return this.#sortByName(filteredList);
    if (option === 'distance') return this.#sortByDistance(filteredList);
  }

  #filterByCategory(category: Category): Restaurant[] {
    if (category === '전체') return this.restaurants;

    return this.restaurants.filter((restaurant) => restaurant.category === category);
  }

  #sortByName(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }

  #sortByDistance(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((a, b) => a.distance - b.distance);
  }
}

export default RestaurantManager;
