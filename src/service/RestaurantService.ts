import Restaurant from '../domain/Restaurant';
import defaultRestaurant from '../data/defaultRestaurants.json';

import type { RestaurantDataType } from '../type/restaurantDataType';
import type { CompareFunctionType } from '../type/compareFunctionType';

import { Category, DistanceByWalk, SortOrder } from '../enum/enums';

class RestaurantService {
  private idCounter: string;
  private restaurants: Restaurant[];

  constructor() {
    this.idCounter = this.loadIdCounter();
    this.restaurants = this.loadRestaurants();
    this.initiateIdCounter();
    this.saveIdCounter(this.idCounter);
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

  addRestaurant(restaurant: RestaurantDataType) {
    this.restaurants.push(new Restaurant({ ...restaurant, id: this.setRestaurantId() }));
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

  private saveRestaurants(restaurants: Restaurant[]) {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }

  private loadRestaurants(): Restaurant[] {
    const restaurants = localStorage.getItem('restaurants');
    if (restaurants) {
      return JSON.parse(restaurants).map(
        (object: RestaurantDataType & { id: string }) => new Restaurant({ ...object }),
      );
    }
    return this.loadDefaultRestaurantData().map(
      (object: RestaurantDataType) => new Restaurant({ ...object, id: this.setRestaurantId() }),
    );
  }

  private loadDefaultRestaurantData(): RestaurantDataType[] {
    return defaultRestaurant.map((restaurant) => {
      const restaurantData: RestaurantDataType = {
        name: restaurant.name,
        category: restaurant.category as Category,
        distanceByWalk: restaurant.distanceByWalk as DistanceByWalk,
        description: restaurant.description,
        referenceUrl: restaurant.referenceUrl,
        favorite: restaurant.favorite,
      };
      return restaurantData;
    });
  }

  private loadIdCounter(): string {
    const idCounter = localStorage.getItem('idCounter');
    if (idCounter) {
      return idCounter;
    }
    return '1';
  }

  private initiateIdCounter() {
    if (this.restaurants) {
      const ids = this.restaurants.map((restaurant) => parseInt(restaurant.getId(), 10));
      this.idCounter = (Math.max(...ids) + 1).toString();
    }
  }

  private setRestaurantId() {
    const restaurantId = this.idCounter;
    this.increaseIdCounter();
    return restaurantId;
  }

  private increaseIdCounter() {
    this.idCounter = (parseInt(this.idCounter, 10) + 1).toString();
    this.saveIdCounter(this.idCounter);
  }

  private saveIdCounter(idCounter: string) {
    localStorage.setItem('idCounter', idCounter);
  }
}

export default RestaurantService;
