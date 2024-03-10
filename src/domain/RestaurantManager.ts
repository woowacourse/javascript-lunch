import { ERROR_MESSAGE } from '../constant/error';
import { Restaurant, Category } from '../interface/Restaurant';

export interface RestaurantManager {
  add(newRestaurant: Restaurant): void;
  getRestaurants(): Restaurant[];
  sortByAscendingName(): Restaurant[];
  sortByAscendingWalkingTime(): Restaurant[];
  filteredRestaurants(category: Category): Restaurant[];
}

export class RestaurantManager implements RestaurantManager {
  private restaurants: Restaurant[];
  private curentSelectedCategory: string;
  private curentSelectedSorting: string;

  constructor(restaurants: Restaurant[] = []) {
    this.restaurants = [...restaurants];
    this.curentSelectedCategory = '전체';
    this.curentSelectedSorting = '이름순';
  }

  add(newRestaurant: Restaurant): void {
    const hasSameName = this.restaurants.some(
      ({ name }) => name === newRestaurant.name
    );

    if (hasSameName) {
      throw new Error(ERROR_MESSAGE.sameRestaurantName);
    }
    this.restaurants.push(newRestaurant);
    switch (this.curentSelectedSorting) {
      case '이름순':
        this.sortByAscendingName();
        break;
      case '거리순':
        this.sortByAscendingWalkingTime();
        break;
    }
    localStorage.setItem('restaurants', JSON.stringify(this.restaurants));
  }

  getRestaurants(): Restaurant[] {
    return [...this.restaurants];
  }

  sortByAscendingName(): Restaurant[] {
    const sortingReataurants = this.filteredRestaurants().sort((a, b) => {
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
    const sortingReataurants = this.filteredRestaurants().sort((a, b) => {
      const aTime = Number(a.walkingTime);
      const bTime = Number(b.walkingTime);

      if (aTime < bTime) return -1;
      if (aTime > bTime) return 1;

      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    return [...sortingReataurants];
  }

  udateCurentCategoty(curentSelectedCategory = '전체') {
    this.curentSelectedCategory = curentSelectedCategory;
  }

  udateCurentSelectedSorting(curentSelectedSorting = '이름순') {
    this.curentSelectedSorting = curentSelectedSorting;
  }

  filteredRestaurants(): Restaurant[] {
    return [...this.restaurants].filter(
      (restaurant) => restaurant.category === this.curentSelectedCategory
    );
  }
}
