import Restaurant from '../domain/Restaurant';
import defaultRestaurant from '../data/defaultRestaurants.json';
import { Category, MinutesWalk, SortType, CompareFunction } from '../constants/Type';
import { IRestaurant } from '../interface/Interface';

class RestaurantService {
  private restaurants: Restaurant[];

  constructor() {
    this.restaurants = this.loadRestaurants();
    this.saveRestaurants(this.restaurants);
  }

  getRestaurants(sortType: SortType, category?: Category): IRestaurant[] {
    const restaurants = category ? this.getRestaurantsByCategory(category) : this.restaurants;
    const compareFunction = this.getCompareFunction(sortType);
    const sortedRestaurants = this.getSortedRestaurants(restaurants, compareFunction);
    return sortedRestaurants.map((restaurant) => restaurant.getData());
  }

  private getRestaurantsByCategory(category: Category) {
    return this.restaurants.filter((restaurant) => restaurant.isMatchedCategory(category));
  }

  private getCompareFunction(sortType: SortType): CompareFunction {
    const compareFunctions: { [key in SortType]: (a: Restaurant, b: Restaurant) => number } = {
      이름순: (a, b) => this.compareName(a, b),
      거리순: (a, b) => this.compareMinutesWalk(a, b),
    };
    return compareFunctions[sortType];
  }

  private getSortedRestaurants(restaurants: Restaurant[], compareFunction: CompareFunction) {
    return [...restaurants].sort(compareFunction);
  }

  private compareName(a: Restaurant, b: Restaurant): number {
    return a.getName().localeCompare(b.getName());
  }

  private compareMinutesWalk(a: Restaurant, b: Restaurant): number {
    return a.getMinutesWalk() - b.getMinutesWalk();
  }

  saveRestaurants(restaurants: Restaurant[]) {
    // TODO: 함수 시행 시점 정하기
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }

  loadRestaurants(): Restaurant[] {
    const restaurants = localStorage.getItem('restaurants');
    if (restaurants) {
      return JSON.parse(restaurants);
    }
    const defaultData = defaultRestaurant.map((restaurant) => {
      const restaurantObject: IRestaurant = {
        name: restaurant.name,
        category: restaurant.category as Category,
        minutesWalk: restaurant.minutesWalk as MinutesWalk,
        description: restaurant.description,
        referenceUrl: restaurant.referenceUrl,
      };
      return restaurantObject;
    });

    return defaultData.map((object: IRestaurant) => new Restaurant(object));
    // TODO: 데이터 없으면 defaultData fetch
  }
}

export default RestaurantService;
