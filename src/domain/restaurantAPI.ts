import { initialData } from '../data/restaurantData';
import { RestaurantInfo } from '../types/types';

const KEY = 'restaurant';

const restaurantAPI = {
  initialize: () => {
    const existingData = window.localStorage.getItem(KEY);
    if (!existingData) {
      window.localStorage.setItem(KEY, JSON.stringify(initialData));
    }
  },

  save: (restaurant: RestaurantInfo) => {
    const json = window.localStorage.getItem(KEY);
    const existingRestaurants: RestaurantInfo[] = json ? JSON.parse(json) : [];

    const isExisting = existingRestaurants.some(
      (existingRestaurant) => existingRestaurant.name === restaurant.name
    );

    if (isExisting) {
      alert(`${restaurant.name} 가 이미 존재합니다.`);
      return;
    }

    const updatedRestaurants = [...existingRestaurants, restaurant];
    window.localStorage.setItem(KEY, JSON.stringify(updatedRestaurants));
    alert(`${restaurant.name} 가 추가되었습니다.`);
  },

  load: () => {
    const json = window.localStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
  },

  updateFavorite: (name: string) => {
    const json = window.localStorage.getItem(KEY);
    const restaurants: RestaurantInfo[] = json ? JSON.parse(json) : [];

    const updatedRestaurants = restaurants.map((restaurant) => {
      if (restaurant.name === name) {
        return {
          ...restaurant,
          isFavorite: !restaurant.isFavorite
        };
      }
      return restaurant;
    });

    window.localStorage.setItem(KEY, JSON.stringify(updatedRestaurants));
    alert(`${name} 식당의 좋아요 상태가 변경되었습니다.`);
  },

  delete: (name: string) => {
    const json = window.localStorage.getItem(KEY);
    const restaurants: RestaurantInfo[] = json ? JSON.parse(json) : [];

    const updatedRestaurants = restaurants.filter((restaurant) => restaurant.name !== name);

    window.localStorage.setItem(KEY, JSON.stringify(updatedRestaurants));
    alert(`${name} 식당이 삭제되었습니다.`);
  }
};

export default restaurantAPI;
