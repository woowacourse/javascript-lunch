import { DEFAULT_KEY } from '../constants/filter';
import { KeyOfCategoryKey, KeyOfSortingKey } from '../types/filter';
import { Restaurant } from '../types/restaurant';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';

class RestDataAPI {
  public static save(restaurant: Restaurant): void {
    const restaurants = this.getRestaurantsList();
    restaurants.push(restaurant);
    this.saveRestaurantsList(restaurants);
  }

  public static load(
    category: KeyOfCategoryKey = DEFAULT_KEY.categoryKey,
    sortingKey: KeyOfSortingKey = DEFAULT_KEY.sortingKey
  ): Restaurant[] {
    const restaurants = this.getRestaurantsList();
    const filteredData = this.filterByCategory(restaurants, category);
    const sortedData = this.sortBySortingKey(filteredData, sortingKey);
    return sortedData;
  }

  private static getRestaurantsList(): Restaurant[] {
    const json = window.localStorage.getItem(LOCAL_STORAGE_KEY.restaurant);
    return json ? JSON.parse(json) : [];
  }

  private static saveRestaurantsList(restaurants: Restaurant[]): void {
    window.localStorage.setItem(LOCAL_STORAGE_KEY.restaurant, JSON.stringify(restaurants));
  }

  private static filterByCategory(restaurants: Restaurant[], category: KeyOfCategoryKey): Restaurant[] {
    if (category === 'all') {
      return restaurants;
    }
    return restaurants.filter((restaurant) => restaurant.category === category);
  }

  private static sortBySortingKey(restaurants: Restaurant[], sortingKey: KeyOfSortingKey): Restaurant[] {
    switch (sortingKey) {
      case 'name':
        return restaurants.sort((a, b) => a.name.localeCompare(b.name));
      case 'distance':
        return restaurants.sort((a, b) => parseInt(a.distance, 10) - parseInt(b.distance, 10));
      default:
        return restaurants;
    }
  }
}

export default RestDataAPI;
