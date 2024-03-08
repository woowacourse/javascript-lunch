import { Category } from '../types/Category';
import { Restaurant } from '../types/Restaurant';
import { Restaurants } from '../types/Restaurants';
import { SortBy } from '../types/SortBy';

type RestaurantDataProviderType = {
  execute: ({ category, sortBy }: ExecuteProps) => Restaurants;
  filterByCategory: ({ category, allRestaurants }: FilterByCategoryProps) => Restaurants;
  sortRestaurants: ({ sortBy, filterRestaurants }: SortRestaurantsProps) => Restaurants;
  sortByCreatedAt: ({ sortBy, filterRestaurants }: SortRestaurantsProps) => Restaurants;
  sortByName: ({ sortBy, filterRestaurants }: SortRestaurantsProps) => Restaurants;
  compareNameOrder: (a: Restaurant, b: Restaurant) => number;
  sortByDistance: ({ sortBy, filterRestaurants }: SortRestaurantsProps) => Restaurants;
};

type ExecuteProps = {
  category?: Category;
  sortBy?: SortBy;
};

type FilterByCategoryProps = {
  category?: Category;
  allRestaurants: Restaurants;
};

type SortRestaurantsProps = {
  sortBy?: SortBy;
  filterRestaurants: Restaurants;
};

/**
 * local에 저장된 key의 value 값을 array로 반환
 * @return {Array}
 */
const RestaurantDataProvider: RestaurantDataProviderType = {
  execute({ category, sortBy }: ExecuteProps): Restaurants {
    const restaurants = localStorage.getItem('restaurants');
    const allRestaurants = JSON.parse(restaurants || '[]');

    const filterRestaurants = category
      ? this.filterByCategory({ category, allRestaurants })
      : allRestaurants;
    const sortedRestaurants = this.sortRestaurants({ sortBy, filterRestaurants });
    return sortedRestaurants;
  },

  filterByCategory({ category, allRestaurants }: FilterByCategoryProps): Restaurants {
    return Object.values(allRestaurants).filter((restaurant) => {
      return restaurant.category === category;
    });
  },

  sortRestaurants({ sortBy, filterRestaurants }: SortRestaurantsProps): Restaurants {
    if (!sortBy || sortBy === '최신순' || sortBy === '오래된순') {
      return this.sortByCreatedAt({ sortBy, filterRestaurants });
    }
    if (sortBy === '가게명순▲' || sortBy === '가게명순▼') {
      return this.sortByName({ sortBy, filterRestaurants });
    }
    return this.sortByDistance({ sortBy, filterRestaurants });
  },

  sortByCreatedAt({ sortBy, filterRestaurants }: SortRestaurantsProps): Restaurants {
    return Object.values(filterRestaurants).sort((a: Restaurant, b: Restaurant): number => {
      if (sortBy === '오래된순') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  },

  sortByName({ sortBy, filterRestaurants }: SortRestaurantsProps): Restaurants {
    return Object.values(filterRestaurants).sort((a: Restaurant, b: Restaurant): number => {
      if (sortBy === '가게명순▲') {
        return this.compareNameOrder(a, b);
      }
      return -this.compareNameOrder(a, b);
    });
  },

  compareNameOrder(a: Restaurant, b: Restaurant): number {
    if (a.name.toUpperCase() > b.name.toUpperCase()) {
      return 1;
    }
    return -1;
  },

  sortByDistance({ sortBy, filterRestaurants }: SortRestaurantsProps): Restaurants {
    return Object.values(filterRestaurants).sort((a: Restaurant, b: Restaurant): number => {
      if (sortBy === '거리순▲') {
        return a.distance - b.distance;
      }
      return b.distance - a.distance;
    });
  },
};

export default RestaurantDataProvider;
