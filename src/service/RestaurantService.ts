import Restaurant from '../domain/Restaurant';
import defaultRestaurant from '../data/defaultRestaurants.json';
import { Category, MinutesWalk, Sort, CompareFunction, LocationData } from '../constants/typings';

class RestaurantService {
  private restaurants: Restaurant[];

  constructor() {
    this.restaurants = this.loadRestaurants();
    this.saveRestaurants(this.restaurants);
  }

  getRestaurants(sort: Sort, category?: Category): LocationData[] {
    const restaurants = category ? this.getRestaurantsByCategory(category) : this.restaurants;
    const compareFunction = this.getCompareFunction(sort);
    const sortedRestaurants = this.getSortedRestaurants(restaurants, compareFunction);
    return sortedRestaurants.map((restaurant) => restaurant.getData());
  }

  private getRestaurantsByCategory(category: Category) {
    return this.restaurants.filter((restaurant) => restaurant.isMatchedCategory(category));
  }

  private getCompareFunction(sort: Sort): CompareFunction {
    const compareFunctions: { [key in Sort]: (a: Restaurant, b: Restaurant) => number } = {
      이름순: (a, b) => this.compareName(a, b),
      거리순: (a, b) => this.compareMinutesWalk(a, b),
    };
    return compareFunctions[sort];
  }

  private getSortedRestaurants(restaurants: Restaurant[], compareFunction: CompareFunction) {
    return [...restaurants].sort(compareFunction);
  }

  private compareName(a: Restaurant, b: Restaurant): number {
    return a.getName().localeCompare(b.getName());
  }

  private compareMinutesWalk(a: Restaurant, b: Restaurant): number {
    const compareResult = a.getMinutesWalk() - b.getMinutesWalk();
    return compareResult === 0 ? a.getName().localeCompare(b.getName()) : compareResult;
  }

  addRestaurant(restaurant: LocationData) {
    this.restaurants.push(new Restaurant(restaurant));
    this.saveRestaurants(this.restaurants);
  }

  private saveRestaurants(restaurants: Restaurant[]) {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }

  private loadRestaurants(): Restaurant[] {
    const restaurants = localStorage.getItem('restaurants');
    if (restaurants) {
      return JSON.parse(restaurants).map((object: LocationData) => new Restaurant(object));
    }
    return this.loadDefaultRestaurantData().map((object: LocationData) => new Restaurant(object));
  }

  private loadDefaultRestaurantData(): LocationData[] {
    return defaultRestaurant.map((restaurant) => {
      const restaurantObject: LocationData = {
        name: restaurant.name,
        category: restaurant.category as Category,
        minutesWalk: restaurant.minutesWalk as MinutesWalk,
        description: restaurant.description,
        referenceUrl: restaurant.referenceUrl,
      };
      return restaurantObject;
    });
  }
}

export default RestaurantService;
