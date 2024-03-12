import Restaurant from '../domain/Restaurant';
import defaultRestaurant from '../data/defaultRestaurants.json';

import type { RestaurantData } from '../type/RestaurantData';
import type { CompareFunction } from '../type/CompareFunction';

import { Category, DistanceByWalk, SortOrder } from '../enum/enums';
class RestaurantService {
  private restaurants: Restaurant[];

  constructor() {
    this.restaurants = this.loadRestaurants();
    this.saveRestaurants(this.restaurants);
  }

  getRestaurants(sortOrder: SortOrder, category?: Category): RestaurantData[] {
    const restaurants = category ? this.getRestaurantsByCategory(category) : this.restaurants;
    const compareFunction = this.getCompareFunction(sortOrder);
    const sortedRestaurants = this.getSortedRestaurants(restaurants, compareFunction);
    return sortedRestaurants.map((restaurant) => restaurant.getData());
  }

  private getRestaurantsByCategory(category: Category) {
    return this.restaurants.filter((restaurant) => restaurant.isMatchedCategory(category));
  }

  private getCompareFunction(sortOrder: SortOrder): CompareFunction {
    const compareFunctions: { [key in SortOrder]: (a: Restaurant, b: Restaurant) => number } = {
      이름순: (a, b) => this.compareName(a, b),
      거리순: (a, b) => this.compareDistanceByWalk(a, b),
    };
    return compareFunctions[sortOrder];
  }

  private getSortedRestaurants(restaurants: Restaurant[], compareFunction: CompareFunction) {
    return [...restaurants].sort(compareFunction);
  }

  private compareName(a: Restaurant, b: Restaurant): number {
    return a.getName().localeCompare(b.getName());
  }

  private compareDistanceByWalk(a: Restaurant, b: Restaurant): number {
    const compareResult = parseInt(a.getDistanceByWalk()) - parseInt(b.getDistanceByWalk());
    return compareResult === 0 ? this.compareName(a, b) : compareResult;
  }

  addRestaurant(restaurant: RestaurantData) {
    this.restaurants.push(new Restaurant(restaurant));
    this.saveRestaurants(this.restaurants);
  }

  private saveRestaurants(restaurants: Restaurant[]) {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }

  private loadRestaurants(): Restaurant[] {
    const restaurants = localStorage.getItem('restaurants');
    if (restaurants) {
      return JSON.parse(restaurants).map((object: RestaurantData) => new Restaurant(object));
    }
    return this.loadDefaultRestaurantData().map((object: RestaurantData) => new Restaurant(object));
  }

  private loadDefaultRestaurantData(): RestaurantData[] {
    return defaultRestaurant.map((restaurant) => {
      const restaurantObject: RestaurantData = {
        name: restaurant.name,
        category: restaurant.category as Category,
        distanceByWalk: restaurant.distanceByWalk as DistanceByWalk,
        description: restaurant.description,
        referenceUrl: restaurant.referenceUrl,
      };
      return restaurantObject;
    });
  }
}

export default RestaurantService;
