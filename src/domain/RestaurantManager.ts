import { ERROR_MESSAGE } from '../constant/error';
import { Restaurant, Category } from '../interface/Restaurant';

export interface IRestaurantManager {
  add(newRestaurant: Restaurant): void;
  getRestaurants(): Restaurant[];
  getfilterRestaurants(): Restaurant[];
  sortByAscendingName(): Restaurant[];
  sortByAscendingWalkingTime(): Restaurant[];
  udateFilterRestaurants(): void;
  filteredRestaurants(category: Category): Restaurant[];
}

export class RestaurantManager implements IRestaurantManager {
  private restaurants: Restaurant[];
  private filterRestaurants: Restaurant[];

  constructor(restaurants: Restaurant[] = []) {
    this.restaurants = [...restaurants];
    this.filterRestaurants = [...restaurants];
  }

  add(newRestaurant: Restaurant): void {
    const hasSameName = this.restaurants.some(
      ({ name }) => name === newRestaurant.name
    );

    if (hasSameName) {
      throw new Error(ERROR_MESSAGE.sameRestaurantName);
    }
    this.filterRestaurants.unshift(newRestaurant);
    this.restaurants.push(newRestaurant);
    localStorage.setItem('restaurants', JSON.stringify(this.restaurants));
  }

  getRestaurants(): Restaurant[] {
    return [...this.restaurants];
  }

  getfilterRestaurants(): Restaurant[] {
    return [...this.filterRestaurants];
  }

  sortByAscendingName(): Restaurant[] {
    const sortingReataurants = this.filterRestaurants.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    this.restaurants.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    return [...sortingReataurants];
  }

  sortByAscendingWalkingTime(): Restaurant[] {
    const sortingReataurants = this.filterRestaurants.sort((a, b) => {
      const aTime = Number(a.walkingTime);
      const bTime = Number(b.walkingTime);

      if (aTime < bTime) return -1;
      if (aTime > bTime) return 1;

      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    this.restaurants.sort((a, b) => {
      const aTime = Number(a.walkingTime);
      const bTime = Number(b.walkingTime);

      if (aTime < bTime) return -1;
      if (aTime > bTime) return 1;

      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    return sortingReataurants;
  }

  udateFilterRestaurants() {
    this.filterRestaurants = [...this.restaurants];
  }

  filteredRestaurants(category: Category): Restaurant[] {
    this.filterRestaurants = [...this.restaurants].filter(
      (restaurant) => restaurant.category === category
    );
    return [...this.filterRestaurants];
  }
}
