import { LOCAL_STORAGE_KEY } from '../constants';

type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

type Distance = 5 | 10 | 15 | 20 | 30;

export type CategoryAll = '전체' | Category;

export type SortTypeAll = 'name' | 'distance';

export interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

class RestaurantList {
  static add(restaurant: Restaurant): void {
    const restaurants = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
    );

    const updatedRestaurants = [...restaurants, restaurant];
    const restaurantsString = JSON.stringify(updatedRestaurants);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, restaurantsString);
  }

  static filterByCategory(restaurantList: Restaurant[], category: CategoryAll) {
    return restaurantList.filter(
      (restaurant) => restaurant.category === category
    );
  }

  static getList(category: CategoryAll, type: SortTypeAll): Restaurant[] {
    const restaurants = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
    );

    if (category === '전체') {
      return RestaurantList.sortByType(restaurants, type);
    }
    const filteredCategory = RestaurantList.filterByCategory(
      restaurants,
      category
    );
    return RestaurantList.sortByType(filteredCategory, type);
  }

  static sortByType(restaurantList: Restaurant[], type: SortTypeAll) {
    if (type === 'distance') {
      return [...restaurantList].sort(
        (aRestaurant, bRestaurant) =>
          aRestaurant.distance - bRestaurant.distance
      );
    }

    return [...restaurantList].sort((aRestaurant, bRestaurant) => {
      return aRestaurant.name.localeCompare(bRestaurant.name);
    });
  }
}

export default RestaurantList;
