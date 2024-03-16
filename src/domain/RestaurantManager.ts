import { Restaurant, Category } from '../domain/interface/Restaurant';
import IdGenerator from './IdGenerator';

export interface RestaurantManager {
  add(newRestaurant: Restaurant): void;
  delete(restaurantId: number): void;
  getRestaurantList(): Restaurant[];
  sortByAscendingNameAndCategory(): Restaurant[];
  sortByAscendingWalkingTimeAndCategory(): Restaurant[];
  filteredRestaurantList(category: Category): Restaurant[];
}

export class RestaurantManager implements RestaurantManager {
  private restaurantList: Restaurant[];
  private currentCategory;
  private currentSortBy;
  private idGenerator;

  constructor(restaurantList: Restaurant[] = []) {
    this.restaurantList = [...restaurantList];
    this.currentCategory = '전체';
    this.currentSortBy = '이름순';
    this.idGenerator = new IdGenerator(restaurantList);
  }

  private validate(restaurant: Restaurant): void {
    const hasSameName = this.restaurantList.some(
      ({ name }) => name === restaurant.name
    );

    if (hasSameName) {
      throw new Error('이미 있는 식당은 다시 추가할 수 없어요.');
    }
  }

  postRestaurantList() {
    localStorage.setItem('restaurantList', JSON.stringify(this.restaurantList));
  }

  add(newRestaurant: Restaurant): void {
    this.validate(newRestaurant);
    newRestaurant.id = this.idGenerator.generateNewId();

    this.restaurantList.push(newRestaurant);
    this.postRestaurantList();

    if (this.currentSortBy === '이름순') this.sortByAscendingName();
    if (this.currentSortBy === '거리순') this.sortByAscendingWalkingTime();
  }

  delete(restaurantId: number): void {
    this.restaurantList = this.restaurantList.filter(
      ({ id }) => id !== restaurantId
    );

    this.postRestaurantList();
  }

  getRestaurantList(): Restaurant[] {
    return [...this.restaurantList];
  }

  private sortByAscendingName(): void {
    const sortedRestaurantList = [...this.restaurantList].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    this.restaurantList = sortedRestaurantList;
  }

  private sortByAscendingWalkingTime(): void {
    const sortedRestaurantList = [...this.restaurantList].sort((a, b) => {
      const aTime = Number(a.walkingTime);
      const bTime = Number(b.walkingTime);

      if (aTime < bTime) return -1;
      if (aTime > bTime) return 1;

      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    this.restaurantList = sortedRestaurantList;
  }

  sortByAscendingNameAndCategory(): Restaurant[] {
    this.sortByAscendingName();

    return this.filteredRestaurantList();
  }

  sortByAscendingWalkingTimeAndCategory(): Restaurant[] {
    this.sortByAscendingWalkingTime();

    return this.filteredRestaurantList();
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  setSortBy(sortBy: string) {
    this.currentSortBy = sortBy;
  }

  filteredRestaurantList(): Restaurant[] {
    if (this.currentCategory === '전체') return [...this.restaurantList];

    return [...this.restaurantList].filter(
      (restaurant) => restaurant.category === this.currentCategory
    );
  }

  getAppliedFiltersRestaurantList() {
    if (this.currentSortBy === '이름순')
      return this.sortByAscendingNameAndCategory();
    if (this.currentSortBy === '거리순')
      return this.sortByAscendingWalkingTimeAndCategory();
  }
}
