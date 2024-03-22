import Restaurant from '../domain/Restaurant';
import defaultRestaurant from '../data/defaultRestaurants.json';
import { CompareFunction } from '../constants/typings';
import { Category, MinutesWalk, Sort } from '../constants/enums';
import { ILocation } from '../interface/LocationInterface';
import RestaurantValidator from '../validator/RestaurantValidator';
import { $ } from '../utils/domSelector';
class RestaurantService {
  private restaurants: Restaurant[];

  constructor() {
    this.restaurants = this.loadRestaurants();
    this.saveRestaurants(this.restaurants);
  }

  getRestaurants(sort: Sort, favorite: boolean, category?: Category) {
    const restaurants = favorite ? this.getFavoriteRestaurants() : this.restaurants;
    const categorizedRestaurants = category ? this.getRestaurantsByCategory(restaurants, category) : restaurants;
    const compareFunction = this.getCompareFunction(sort);
    const sortedRestaurants = this.getSortedRestaurants(categorizedRestaurants, compareFunction);
    return sortedRestaurants.map((restaurant) => restaurant.getData());
  }

  getFavoriteRestaurants() {
    return this.restaurants.filter((restaurant) => restaurant.getFavorite());
  }

  toggleFavorite(detail: string) {
    this.restaurants.forEach((restaurant) => {
      if (restaurant.getName() === detail) {
        restaurant.toggleFavorite();
      }
    });
    this.saveRestaurants(this.restaurants);
  }

  toggleFavoriteFromModal(detail: string) {
    this.restaurants.forEach((restaurant) => {
      if (restaurant.getName() === detail) {
        restaurant.toggleFavorite();
      }
    });
    this.saveRestaurants(this.restaurants);
    location.reload();
  }

  private getRestaurantsByCategory(restaurants: Restaurant[], category: Category) {
    return restaurants.filter((restaurant) => restaurant.isMatchedCategory(category));
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
    const compareValue = a.getMinutesWalk().valueOf() - b.getMinutesWalk().valueOf();
    return compareValue === 0 ? a.getName().localeCompare(b.getName()) : compareValue;
  }

  addRestaurant(restaurant: ILocation) {
    try {
      RestaurantValidator.validateUserInput(restaurant);
      this.restaurants.push(new Restaurant(restaurant));
      this.saveRestaurants(this.restaurants);
      const addRestaurantModal = $<HTMLDialogElement>('#add-restaurant-modal');
      if (addRestaurantModal) addRestaurantModal.close();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  }

  deleteRestaurant(detail: string) {
    this.restaurants = this.restaurants.filter((restaurants) => restaurants.getName() !== detail);
    this.saveRestaurants(this.restaurants);
  }

  private saveRestaurants(restaurants: Restaurant[]) {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }

  private loadRestaurants(): Restaurant[] {
    const restaurants = localStorage.getItem('restaurants');
    if (restaurants) {
      return JSON.parse(restaurants).map((object: ILocation) => new Restaurant(object));
    }
    return this.loadDefaultRestaurantData().map((object: ILocation) => new Restaurant(object));
  }

  private loadDefaultRestaurantData(): ILocation[] {
    return defaultRestaurant.map((restaurant) => {
      const restaurantObject: ILocation = {
        name: restaurant.name,
        category: restaurant.category as Category,
        minutesWalk: restaurant.minutesWalk as MinutesWalk,
        description: restaurant.description,
        referenceUrl: restaurant.referenceUrl,
        favorite: restaurant.favorite,
      };
      return restaurantObject;
    });
  }
}

export default RestaurantService;
