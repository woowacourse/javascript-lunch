import Restaurant from '../domain/Restaurant';
import defaultRestaurant from '../data/defaultRestaurants.json';

import type { RestaurantDataType } from '../type/restaurantDataType';
import type { CompareFunctionType } from '../type/compareFunctionType';

import { Category, DistanceByWalk, SortOrder } from '../enum/enums';

class RestaurantService {
  private restaurants: Restaurant[];

  constructor() {
    this.restaurants = this.loadRestaurants();
    this.saveRestaurants(this.restaurants);
  }

  getRestaurants(sortOrder: SortOrder, category?: Category): RestaurantDataType[] {
    const restaurants = this.restaurants;
    const restaurantsByCategory = category ? this.getRestaurantsByCategory(restaurants, category) : this.restaurants;
    const sortedRestaurantsByCategory = this.getSortedRestaurants(
      restaurantsByCategory,
      this.getCompareFunction(sortOrder),
    );
    return sortedRestaurantsByCategory.map((restaurant) => restaurant.getData());
  }

  getFavoriteRestaurants() {
    return this.restaurants.filter((restaurant) => restaurant.isFavorite()).map((restaurant) => restaurant.getData());
  }

  private getRestaurantsByCategory(restaurants: Restaurant[], category: Category) {
    return restaurants.filter((restaurant) => restaurant.isMatchedCategory(category));
  }

  private getCompareFunction(sortOrder: SortOrder): CompareFunctionType {
    const compareFunctions: { [key in SortOrder]: (a: Restaurant, b: Restaurant) => number } = {
      이름순: (a, b) => this.compareName(a, b),
      거리순: (a, b) => this.compareDistanceByWalk(a, b),
    };
    return compareFunctions[sortOrder];
  }

  private getSortedRestaurants(restaurants: Restaurant[], compareFunction: CompareFunctionType) {
    return [...restaurants].sort(compareFunction);
  }

  private compareName(a: Restaurant, b: Restaurant): number {
    return a.getName().localeCompare(b.getName());
  }

  private compareDistanceByWalk(a: Restaurant, b: Restaurant): number {
    const compareResult = parseInt(a.getDistanceByWalk()) - parseInt(b.getDistanceByWalk());
    return compareResult === 0 ? this.compareName(a, b) : compareResult;
  }

  addRestaurant(restaurant: RestaurantDataType) {
    this.restaurants.push(new Restaurant(restaurant));
    this.saveRestaurants(this.restaurants);
  }

  updateRestaurantFavorite(restaurantName: string, isFavorited: boolean) {
    const restaurant = this.restaurants.find((restaurant) => restaurant.getName() === restaurantName);
    if (!restaurant) {
      throw new Error('찾으시는 음식점 정보를 찾을 수 없습니다.');
    }
    restaurant.updateFavorite(isFavorited);
    this.saveRestaurants(this.restaurants);
  }

  deleteRestaurant(restaurantName: string) {
    this.restaurants = this.restaurants.filter((restaurant) => restaurant.getName() !== restaurantName);
    this.saveRestaurants(this.restaurants);
  }

  private saveRestaurants(restaurants: Restaurant[]) {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }

  private loadRestaurants(): Restaurant[] {
    const restaurants = localStorage.getItem('restaurants');
    if (restaurants) {
      return JSON.parse(restaurants).map((object: RestaurantDataType) => new Restaurant(object));
    }
    return this.loadDefaultRestaurantData().map((object: RestaurantDataType) => new Restaurant(object));
  }

  private loadDefaultRestaurantData(): RestaurantDataType[] {
    return defaultRestaurant.map((restaurant) => {
      const restaurantObject: RestaurantDataType = {
        name: restaurant.name,
        category: restaurant.category as Category,
        distanceByWalk: restaurant.distanceByWalk as DistanceByWalk,
        description: restaurant.description,
        referenceUrl: restaurant.referenceUrl,
        favorite: restaurant.favorite,
      };
      return restaurantObject;
    });
  }
}

export default RestaurantService;
