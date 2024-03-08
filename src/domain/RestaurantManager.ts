import { IRestaurant, Category } from '../domain/interface/IRestaurant';

export interface IRestaurantManager {
  add(newRestaurant: IRestaurant): void;
  getRestaurants(): IRestaurant[];
  getfilterRestaurants(): IRestaurant[];
  sortByAscendingName(): IRestaurant[];
  sortByAscendingWalkingTime(): IRestaurant[];
  udateFilterRestaurants(): void;
  filteredRestaurants(category: Category): IRestaurant[];
}

export class RestaurantManager implements IRestaurantManager {
  private restaurants: IRestaurant[];
  private filterRestaurants: IRestaurant[];

  constructor(restaurants: IRestaurant[] = []) {
    this.restaurants = [...restaurants];
    this.filterRestaurants = [...restaurants];
  }

  add(newRestaurant: IRestaurant): void {
    const hasSameName = this.restaurants.some(
      ({ name }) => name === newRestaurant.name
    );

    if (hasSameName) {
      throw new Error('이미 있는 식당은 다시 추가할 수 없어요.');
    }

    this.restaurants.push(newRestaurant);
    localStorage.setItem('restaurants', JSON.stringify(this.restaurants));
  }

  getRestaurants(): IRestaurant[] {
    return [...this.restaurants];
  }

  getfilterRestaurants(): IRestaurant[] {
    return [...this.filterRestaurants];
  }

  sortByAscendingName(): IRestaurant[] {
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

  sortByAscendingWalkingTime(): IRestaurant[] {
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

  filteredRestaurants(category: Category): IRestaurant[] {
    this.filterRestaurants = [...this.restaurants].filter(
      (restaurant) => restaurant.category === category
    );
    return [...this.filterRestaurants];
  }
}
