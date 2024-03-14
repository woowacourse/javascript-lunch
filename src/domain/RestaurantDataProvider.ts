import { SORTBY } from '../constants/sortBy';
import { Category } from '../types/Category';
import { Restaurant } from '../types/Restaurant';
import { Restaurants } from '../types/Restaurants';
import { SortBy } from '../types/SortBy';

type RestaurantDataProviderType = {
  getAllRestaurantsByOption: ({
    category,
    sortBy,
    database,
  }: getAllRestaurantsByOptionProps) => Restaurants;
  filterByCategory: ({ category, allRestaurants }: FilterByCategoryProps) => Restaurants;
  sortRestaurants: ({ sortBy, filterRestaurants }: SortRestaurantsProps) => Restaurants;
  sortByCreatedAt: ({ sortBy, filterRestaurants }: SortRestaurantsProps) => Restaurants;
  sortByName: ({ sortBy, filterRestaurants }: SortRestaurantsProps) => Restaurants;
  compareNameOrder: (a: Restaurant, b: Restaurant) => number;
  sortByDistance: ({ sortBy, filterRestaurants }: SortRestaurantsProps) => Restaurants;
};

type getAllRestaurantsByOptionProps = {
  category?: Category;
  sortBy?: SortBy;
  database?: string;
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
  getAllRestaurantsByOption(props: getAllRestaurantsByOptionProps): Restaurants {
    const restaurants = localStorage.getItem(props.database ?? 'restaurants');
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
    if (!props.sortBy || props.sortBy === SORTBY.newest || props.sortBy === SORTBY.oldest) {
      return this.sortByCreatedAt(props);
    }
    if (props.sortBy === SORTBY.nameAscending || props.sortBy === SORTBY.nameDescending) {
      return this.sortByName(props);
    }
    return this.sortByDistance(props);
  },

  sortByCreatedAt(props: SortRestaurantsProps): Restaurants {
    return Object.values(props.filterRestaurants).sort((a: Restaurant, b: Restaurant): number => {
      if (props.sortBy === SORTBY.oldest) {
        return a.createdAt - b.createdAt;
      }
      return b.createdAt - a.createdAt;
    });
  },

  sortByName(props: SortRestaurantsProps): Restaurants {
    return Object.values(props.filterRestaurants).sort((a: Restaurant, b: Restaurant): number => {
      if (props.sortBy === SORTBY.nameAscending) {
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
      if (props.sortBy === SORTBY.distanceAscending) {
        return a.distance - b.distance;
      }
      return b.distance - a.distance;
    });
  },
};

export default RestaurantDataProvider;
