import Restaurant from '../domain/Restaurant';
import { Category } from '../constants/Type';
import { IRestaurant } from '../interface/Interface';

const testData: IRestaurant[] = [
  {
    name: '하동관',
    category: '한식',
    minutesWalk: 5,
    description: '곰탕 유명',
    referenceUrl: 'https://naver.com',
  },
  {
    name: '마담밍',
    category: '중식',
    minutesWalk: 5,
    description: '중국냉면 유명',
    referenceUrl: 'https://woowahan.com',
  },
];

type SortType = '이름순' | '거리순';
type CompareFunction = (a: Restaurant, b: Restaurant) => number;

class RestaurantService {
  private restaurants: Restaurant[];

  constructor() {
    const restaurants = this.loadRestaurants();
    this.restaurants = restaurants ?? testData.map((item) => new Restaurant(item));
  }

  // getRestaurantListObject(): object[] {
  //   const restaurantList = this.restaurants.map((restaurant) => restaurant.getData());
  //   return restaurantList;
  // }

  // getRestaurantListByCategoryObject(categoryText: Category): object[] {
  //   const restaurantListByCategory = this.restaurants
  //     .filter((restaurant) => restaurant.isMatchedCategory(categoryText))
  //     .map((restaurant) => restaurant.getData());
  //   return restaurantListByCategory;
  // }

  getRestaurants(category: Category, sortType: SortType): IRestaurant[] {
    const restaurantsByCategory = this.restaurants.filter((restaurant) => restaurant.isMatchedCategory(category));
    const compareFunction = this.getCompareFunction(sortType);
    const sortedRestaurantsByCategory = this.getSortedRestaurants(restaurantsByCategory, compareFunction);
    return sortedRestaurantsByCategory.map((restaurant) => restaurant.getData());
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

  addNewRestaurant(event) {
    const restaurantData: IRestaurant = event.detail;
    const newRestaurant: Restaurant = new Restaurant(restaurantData);
    this.restaurants = [...this.restaurants, newRestaurant];
    this.saveRestaurants([...this.restaurants]);
  }

  saveRestaurants(restaurants: Restaurant[]) {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }

  loadRestaurants(): Restaurant[] | null {
    const restaurants = localStorage.getItem('restaurants');
    if (restaurants) {
      return JSON.parse(restaurants);
    }
    return null;
  }
}

export default RestaurantService;
