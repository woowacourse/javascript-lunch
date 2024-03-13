import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';
import { SORTBY } from '../constants/sortBy';
import { Category } from '../types/Category';
import { Restaurant } from '../types/Restaurant';
import { Restaurants } from '../types/Restaurants';
import { SortBy } from '../types/SortBy';

type RestaurantDataProviderType = {
  execute: ({ category, sortBy }: ExecuteProps) => Restaurants;
  filterByCategory: ({
    category,
    filterByLikedAllRestaurants,
  }: FilterByCategoryProps) => Restaurants;
  sortRestaurants: ({ sortBy, filterRestaurants }: SortRestaurantsProps) => Restaurants;
  sortByCreatedAt: ({ sortBy, filterRestaurants }: SortRestaurantsProps) => Restaurants;
  sortByName: ({ sortBy, filterRestaurants }: SortRestaurantsProps) => Restaurants;
  compareNameOrder: (a: Restaurant, b: Restaurant) => number;
  sortByDistance: ({ sortBy, filterRestaurants }: SortRestaurantsProps) => Restaurants;
  filterByLiked: ({ allRestaurants, liked }: FilterByLikedProps) => Restaurants;
};

type ExecuteProps = {
  category?: Category;
  sortBy?: SortBy;
  liked: boolean;
};

type FilterByCategoryProps = {
  category?: Category;
  filterByLikedAllRestaurants: Restaurants;
};

type SortRestaurantsProps = {
  sortBy?: SortBy;
  filterRestaurants: Restaurants;
};

type FilterByLikedProps = {
  allRestaurants: Restaurants;
  liked: boolean;
};

/**
 * local에 저장된 key의 value 값을 array로 반환
 * @return {Array}
 */
const RestaurantDataProvider: RestaurantDataProviderType = {
  execute({ category, sortBy, liked }: ExecuteProps): Restaurants {
    const restaurants = localStorage.getItem(LOCAL_STORAGE_KEYS.restaurants);
    const allRestaurants = JSON.parse(restaurants ?? '[]');

    const filterByLikedAllRestaurants = this.filterByLiked({ allRestaurants, liked });
    const filterRestaurants = category
      ? this.filterByCategory({ category, filterByLikedAllRestaurants })
      : filterByLikedAllRestaurants;
    const sortedRestaurants = this.sortRestaurants({ sortBy, filterRestaurants });
    return sortedRestaurants;
  },

  filterByCategory({ category, filterByLikedAllRestaurants }: FilterByCategoryProps): Restaurants {
    return Object.values(filterByLikedAllRestaurants).filter(
      (restaurant) => restaurant.category === category,
    );
  },

  sortRestaurants({ sortBy, filterRestaurants }: SortRestaurantsProps): Restaurants {
    if (!sortBy || sortBy === SORTBY.newest || sortBy === SORTBY.oldest) {
      return this.sortByCreatedAt({ sortBy, filterRestaurants });
    }
    if (sortBy === SORTBY.nameAscending || sortBy === SORTBY.nameDescending) {
      return this.sortByName({ sortBy, filterRestaurants });
    }
    return this.sortByDistance({ sortBy, filterRestaurants });
  },

  sortByCreatedAt({ sortBy, filterRestaurants }: SortRestaurantsProps): Restaurants {
    return Object.values(filterRestaurants).sort((a: Restaurant, b: Restaurant): number => {
      if (sortBy === SORTBY.oldest) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  },

  sortByName({ sortBy, filterRestaurants }: SortRestaurantsProps): Restaurants {
    return Object.values(filterRestaurants).sort((a: Restaurant, b: Restaurant): number => {
      if (sortBy === SORTBY.nameAscending) {
        return this.compareNameOrder(a, b);
      }
      return -this.compareNameOrder(a, b);
    });
  },

  compareNameOrder(a: Restaurant, b: Restaurant): number {
    return a.name.localeCompare(b.name);
  },

  sortByDistance({ sortBy, filterRestaurants }: SortRestaurantsProps): Restaurants {
    return Object.values(filterRestaurants).sort((a: Restaurant, b: Restaurant): number => {
      if (sortBy === SORTBY.distanceAscending) {
        return a.distance - b.distance;
      }
      return b.distance - a.distance;
    });
  },

  filterByLiked({ allRestaurants, liked }: FilterByLikedProps): Restaurants {
    if (liked) {
      return allRestaurants.filter((restaurant) => restaurant.liked === liked);
    }
    return allRestaurants;
  },
};

export default RestaurantDataProvider;
