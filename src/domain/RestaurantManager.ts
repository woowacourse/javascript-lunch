import { IRestaurant, Category } from '../domain/interface/IRestaurant';

export interface IRestaurantManager {
  add(newRestaurant: IRestaurant): void;
  getRestaurants(): IRestaurant[];
  sortByAscendingName(): IRestaurant[];
  sortByAscendingWalkingTime(): IRestaurant[];
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

    if (this.currentSortBy === '이름순')
      this.restaurants = this.sortByAscendingName();
    if (this.currentSortBy === '거리순')
      this.restaurants = this.sortByAscendingWalkingTime();
  }

  getRestaurants(): IRestaurant[] {
    return [...this.restaurants];
  }

  sortByAscendingName(): IRestaurant[] {
    this.currentSortBy = '이름순';

    const sortedRestaurants = this.filteredRestaurants().sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    this.restaurants = sortedRestaurants;
    return sortedRestaurants;
  }

  sortByAscendingWalkingTime(): IRestaurant[] {
    this.currentSortBy = '거리순';

    const sortedRestaurants = this.filteredRestaurants().sort((a, b) => {
      const aTime = Number(a.walkingTime);
      const bTime = Number(b.walkingTime);

      if (aTime < bTime) return -1;
      if (aTime > bTime) return 1;

      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    this.restaurants = sortedRestaurants;
    return sortedRestaurants;
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  filteredRestaurants(): IRestaurant[] {
    console.log(this.currentSortBy);
    if (this.currentCategory === '전체') return [...this.restaurants];

    return [...this.restaurants].filter(
      (restaurant) => restaurant.category === this.currentCategory
    );
  }
}
