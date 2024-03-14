import { Restaurant, Category } from '../domain/interface/Restaurant';

export interface RestaurantManager {
  add(newRestaurant: Restaurant): void;
  getRestaurantList(): Restaurant[];
  sortByAscendingNameAndCategory(): Restaurant[];
  sortByAscendingWalkingTimeAndCategory(): Restaurant[];
  filteredRestaurantList(category: Category): Restaurant[];
}

export class RestaurantManager implements RestaurantManager {
  private restaurantList: Restaurant[];
  private currentCategory;
  private currentSortBy;

  constructor(restaurantList: Restaurant[] = []) {
    this.restaurantList = [...restaurantList];
    this.currentCategory = '전체';
    this.currentSortBy = '이름순';
  }

  private validate(restaurant: Restaurant): void {
    const hasSameName = this.restaurantList.some(
      ({ name }) => name === restaurant.name
    );

    if (hasSameName) {
      throw new Error('이미 있는 식당은 다시 추가할 수 없어요.');
    }
  }

  add(newRestaurant: Restaurant): void {
    this.validate(newRestaurant);

    this.restaurantList.push(newRestaurant);
    localStorage.setItem('restaurantList', JSON.stringify(this.restaurantList));

    if (this.currentSortBy === '이름순') this.sortByAscendingName();
    if (this.currentSortBy === '거리순') this.sortByAscendingWalkingTime();
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
    this.currentSortBy = '이름순';
    this.sortByAscendingName();

    return this.filteredRestaurantList();
  }

  sortByAscendingWalkingTimeAndCategory(): Restaurant[] {
    this.currentSortBy = '거리순';
    this.sortByAscendingWalkingTime();

    return this.filteredRestaurantList();
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  filteredRestaurantList(): Restaurant[] {
    console.log(this.currentCategory);
    if (this.currentCategory === '전체') return [...this.restaurantList];

    return [...this.restaurantList].filter(
      (restaurant) => restaurant.category === this.currentCategory
    );
  }
}
