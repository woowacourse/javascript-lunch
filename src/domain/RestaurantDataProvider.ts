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
  execute(props: ExecuteProps): Restaurants {
    const restaurants = localStorage.getItem('restaurants');
    const allRestaurants = JSON.parse(restaurants || '[]');

    const filterRestaurants = props.category
      ? this.filterByCategory({ category: props.category, allRestaurants })
      : allRestaurants;
    const sortedRestaurants = this.sortRestaurants({ sortBy: props.sortBy, filterRestaurants });
    return sortedRestaurants;
  },

  filterByCategory(props: FilterByCategoryProps): Restaurants {
    return Object.values(props.allRestaurants).filter((restaurant) => {
      return restaurant.category === props.category;
    });
  },

  sortRestaurants(props: SortRestaurantsProps): Restaurants {
    if (!props.sortBy || props.sortBy === '최신순' || props.sortBy === '오래된순') {
      return this.sortByCreatedAt(props);
    }
    if (props.sortBy === '가게명순▲' || props.sortBy === '가게명순▼') {
      return this.sortByName(props);
    }
    return this.sortByDistance(props);
  },

  sortByCreatedAt(props: SortRestaurantsProps): Restaurants {
    return Object.values(props.filterRestaurants).sort((a: Restaurant, b: Restaurant): number => {
      if (props.sortBy === '오래된순') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  },

  sortByName(props: SortRestaurantsProps): Restaurants {
    return Object.values(props.filterRestaurants).sort((a: Restaurant, b: Restaurant): number => {
      if (props.sortBy === '가게명순▲') {
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

  sortByDistance(props: SortRestaurantsProps): Restaurants {
    return Object.values(props.filterRestaurants).sort((a: Restaurant, b: Restaurant): number => {
      if (props.sortBy === '거리순▲') {
        return a.distance - b.distance;
      }
      return b.distance - a.distance;
    });
  },
};

export default RestaurantDataProvider;
