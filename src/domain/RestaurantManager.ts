import { IRestaurant, Category } from '../domain/interface/IRestaurant';

export interface IRestaurantManager {
  add(newRestaurant: IRestaurant): void;
  getRestaurants(): IRestaurant[];
  sortByAscendingNameAndCategory(): IRestaurant[];
  sortByAscendingWalkingTimeAndCategory(): IRestaurant[];
  filteredRestaurants(category: Category): IRestaurant[];
}

export class RestaurantManager implements IRestaurantManager {
  private restaurants: IRestaurant[];
  private currentCategory;
  private currentSortBy;

  constructor(restaurants: IRestaurant[] = []) {
    this.restaurants = [...restaurants];
    this.currentCategory = '전체';
    this.currentSortBy = '이름순';
  }

  private validate(restaurant: IRestaurant): void {
    const hasSameName = this.restaurants.some(
      ({ name }) => name === restaurant.name
    );

    if (hasSameName) {
      throw new Error('이미 있는 식당은 다시 추가할 수 없어요.');
    }
  }

  add(newRestaurant: IRestaurant): void {
    this.validate(newRestaurant);

    this.restaurants.push(newRestaurant);
    localStorage.setItem('restaurants', JSON.stringify(this.restaurants));

    if (this.currentSortBy === '이름순') this.sortByAscendingName();
    if (this.currentSortBy === '거리순') this.sortByAscendingWalkingTime();
  }

  getRestaurants(): IRestaurant[] {
    return [...this.restaurants];
  }

  private sortByAscendingName(): void {
    const sortedRestaurants = [...this.restaurants].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    this.restaurants = sortedRestaurants;
  }

  private sortByAscendingWalkingTime(): void {
    const sortedRestaurants = [...this.restaurants].sort((a, b) => {
      const aTime = Number(a.walkingTime);
      const bTime = Number(b.walkingTime);

      if (aTime < bTime) return -1;
      if (aTime > bTime) return 1;

      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    this.restaurants = sortedRestaurants;
  }

  sortByAscendingNameAndCategory(): IRestaurant[] {
    this.currentSortBy = '이름순';
    this.sortByAscendingName();

    return this.filteredRestaurants();
  }

  sortByAscendingWalkingTimeAndCategory(): IRestaurant[] {
    this.currentSortBy = '거리순';
    this.sortByAscendingWalkingTime();

    return this.filteredRestaurants();
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  filteredRestaurants(): IRestaurant[] {
    console.log(this.currentCategory);
    if (this.currentCategory === '전체') return [...this.restaurants];

    return [...this.restaurants].filter(
      (restaurant) => restaurant.category === this.currentCategory
    );
  }
}
