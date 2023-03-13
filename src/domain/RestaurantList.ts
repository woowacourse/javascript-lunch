import { LOCAL_STORAGE_KEY } from '../constants';

type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

type Distance = 5 | 10 | 15 | 20 | 30;

type CategoryAll = '전체' | Category;

type SortTypeAll = 'name' | 'distance';

export interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  isFavorite: boolean;
}

const RestaurantList = {
  add: (restaurant: Restaurant): void => {
    const restaurants = RestaurantList.getLocalStorage();
    const updatedRestaurants = [...restaurants, restaurant];

    RestaurantList.updateRestaurants(updatedRestaurants);
  },

  delete: (name: string) => {
    const restaurants = RestaurantList.getList();
    const findIndex = restaurants.findIndex(
      (restaurant) => restaurant.name === name
    );

    if (findIndex === -1) return;

    const updatedRestaurat = restaurants;
    updatedRestaurat.splice(findIndex, 1);

    RestaurantList.updateRestaurants(updatedRestaurat);
  },

  filterByCategory: (restaurantList: Restaurant[], category: CategoryAll) => {
    return restaurantList.filter(
      (restaurant) => restaurant.category === category
    );
  },

  getLocalStorage() {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '');
  },

  getList: (
    category: CategoryAll = '전체',
    type: SortTypeAll = 'name'
  ): Restaurant[] => {
    const restaurants = RestaurantList.getLocalStorage();

    if (category === '전체') {
      return RestaurantList.sortByType(restaurants, type);
    }

    const filteredCategory = RestaurantList.filterByCategory(
      restaurants,
      category
    );

    return RestaurantList.sortByType(filteredCategory, type);
  },

  sortByType: (restaurantList: Restaurant[], type: SortTypeAll) => {
    if (type === 'distance') {
      return [...restaurantList].sort(
        (aRestaurant, bRestaurant) =>
          aRestaurant.distance - bRestaurant.distance
      );
    }

    return [...restaurantList].sort((aRestaurant, bRestaurant) => {
      return aRestaurant.name.localeCompare(bRestaurant.name);
    });
  },

  updateRestaurants: (restaurants: Restaurant[]) => {
    const restaurantsString = JSON.stringify(restaurants);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, restaurantsString);
  },

  updateFavorite: (name: string) => {
    const restaurants = RestaurantList.getList();
    const findIndex = restaurants.findIndex(
      (restaurant) => restaurant.name === name
    );
    if (findIndex === -1) return;
    const curIsFavorite = restaurants[findIndex].isFavorite;
    const updatedRestaurants = restaurants;

    updatedRestaurants.splice(findIndex, 1, {
      ...restaurants[findIndex],
      isFavorite: !curIsFavorite,
    });

    RestaurantList.updateRestaurants(updatedRestaurants);
  },
};

export default RestaurantList;
