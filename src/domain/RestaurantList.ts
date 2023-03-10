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
  isFavorite: boolean;
}

class RestaurantList {
  static add(restaurant: Restaurant): void {
    const restaurants = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
    );

    const updatedRestaurants = [...restaurants, restaurant];
    RestaurantList.updateRestaurants(updatedRestaurants);
  }

  static filterByCategory(restaurantList: Restaurant[], category: CategoryAll) {
    return restaurantList.filter(
      (restaurant) => restaurant.category === category
    );
  }

  static getList(
    category: CategoryAll = '전체',
    type: SortTypeAll = 'name'
  ): Restaurant[] {
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

  static updateRestaurants(restaurants: Restaurant[]) {
    const restaurantsString = JSON.stringify(restaurants);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, restaurantsString);
  }

  static updateFavorite(name: string) {
    const restaurants = RestaurantList.getList();
    const findIndex = restaurants.findIndex(
      (restaurant) => restaurant.name === name
    );
    if (findIndex === -1) return;
    const curIsFavorite = restaurants[findIndex].isFavorite;
    const updatedRestaurants = [
      ...restaurants.slice(0, findIndex),
      {
        ...restaurants[findIndex],
        isFavorite: !curIsFavorite,
      },
      ...restaurants.slice(findIndex + 1),
    ];

    RestaurantList.updateRestaurants(updatedRestaurants);
  }
}

export default RestaurantList;
