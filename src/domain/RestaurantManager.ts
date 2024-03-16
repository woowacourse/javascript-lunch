import { ERROR_MESSAGE } from '../constant/error';
import { Restaurant, Category } from '../interface/Restaurant';

export interface RestaurantManager {
  addRestaurant(newRestaurant: Restaurant): void;
  addFavoriteRestaurant(favoriteRestaurant: Restaurant): void;
  getRestaurants(): Restaurant[];
  sortByAscendingName(): Restaurant[];
  sortByAscendingWalkingTime(): Restaurant[];
  filteredRestaurants(): Restaurant[];
  getUpdatedTotalRsetaurants(): Restaurant[];
  getUpdatedFavoriteRestaurants(): Restaurant[];
}

export class RestaurantManager implements RestaurantManager {
  private totalRestaurants: Restaurant[];
  private curentSelectedCategory: string;
  private curentSelectedSorting: string;
  private favoriteRestaurants: Restaurant[];

  constructor(
    restaurants: Restaurant[] = [],
    favoriteRestaurants: Restaurant[] = []
  ) {
    this.totalRestaurants = [...restaurants];
    this.favoriteRestaurants = [...favoriteRestaurants];
    this.curentSelectedCategory = '전체';
    this.curentSelectedSorting = '이름순';
  }

  addRestaurant(newRestaurant: Restaurant): void {
    const hasSameName = this.totalRestaurants.some(
      ({ name }) => name === newRestaurant.name
    );
    if (hasSameName) {
      throw new Error(ERROR_MESSAGE.sameRestaurantName);
    }
    this.totalRestaurants.push(newRestaurant);
    localStorage.setItem('restaurants', JSON.stringify(this.totalRestaurants));
  }

  addFavoriteRestaurant(favoriteRestaurant: Restaurant): void {
    this.favoriteRestaurants.push(favoriteRestaurant);
    switch (this.curentSelectedSorting) {
      case '이름순':
        this.sortByAscendingName();
        break;
      case '거리순':
        this.sortByAscendingWalkingTime();
        break;
    }
    localStorage.setItem(
      'favoriteRestaurants',
      JSON.stringify(this.favoriteRestaurants)
    );
  }

  getRestaurants(): Restaurant[] {
    return [...this.totalRestaurants];
  }

  sortByAscendingName(selectedRestaurants: Restaurant[] = []): Restaurant[] {
    const sortingReataurants = this.filteredRestaurants(
      selectedRestaurants
    ).sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    return [...sortingReataurants];
  }

  sortByAscendingWalkingTime(
    selectedRestaurants: Restaurant[] = []
  ): Restaurant[] {
    const sortingReataurants = this.filteredRestaurants(
      selectedRestaurants
    ).sort((a, b) => {
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

  filteredRestaurants(selectedRestaurants: Restaurant[] = []): Restaurant[] {
    if (this.curentSelectedCategory === '전체') {
      return [...selectedRestaurants];
    }

    return selectedRestaurants.filter(
      (restaurant) => restaurant.category === this.curentSelectedCategory
    );
  }

  getUpdatedTotalRsetaurants(): Restaurant[] {
    switch (this.curentSelectedSorting) {
      case '이름순':
        return this.sortByAscendingName([...this.totalRestaurants]);
      case '거리순':
        return this.sortByAscendingWalkingTime([...this.totalRestaurants]);
    }
    return [];
  }

  getUpdatedFavoriteRestaurants(): Restaurant[] {
    switch (this.curentSelectedSorting) {
      case '이름순':
        return this.sortByAscendingName([...this.favoriteRestaurants]);
      case '거리순':
        return this.sortByAscendingWalkingTime([...this.favoriteRestaurants]);
    }
    return [];
  }

  removeTotalRestaurant(removeRestaurant: Restaurant): Restaurant[] {
    this.totalRestaurants = this.totalRestaurants.filter((restaurant) => {
      return restaurant['name'] !== removeRestaurant['name'];
    });
    localStorage.setItem(
      'restaurants',
      JSON.stringify(this.favoriteRestaurants)
    );
    return [...this.favoriteRestaurants];
  }

  removeFavoriteRestaurant(removeRestaurant: Restaurant): Restaurant[] {
    this.favoriteRestaurants = this.favoriteRestaurants.filter((restaurant) => {
      return restaurant['name'] !== removeRestaurant['name'];
    });
    localStorage.setItem(
      'favoriteRestaurants',
      JSON.stringify(this.favoriteRestaurants)
    );

    return [...this.favoriteRestaurants];
  }
}
