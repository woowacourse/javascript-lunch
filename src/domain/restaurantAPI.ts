import ToastMessage from '../components/common/ToastMessage';
import { initialData } from '../data/restaurantData';
import { RestaurantInfo } from '../types';

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
      ToastMessage().render(`${restaurant.name} 가 이미 존재합니다.`);
      return;
    }

    const updatedRestaurants = [...existingRestaurants, restaurant];
    window.localStorage.setItem(KEY, JSON.stringify(updatedRestaurants));
    ToastMessage().render(`${restaurant.name} 가 추가되었습니다.`);
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
        const updatedRestaurant = {
          ...restaurant,
          isFavorite: !restaurant.isFavorite
        };

        let message = updatedRestaurant.isFavorite
          ? `"${name}" 식당을\n즐겨찾기 목록에 추가했습니다.`
          : `"${name}" 식당을\n즐겨찾기 목록에서 제거했습니다.`;

        ToastMessage().render(message);

        return updatedRestaurant;
      }
      return restaurant;
    });

    window.localStorage.setItem(KEY, JSON.stringify(updatedRestaurants));
  },

  delete: (name: string) => {
    const json = window.localStorage.getItem(KEY);
    const restaurants: RestaurantInfo[] = json ? JSON.parse(json) : [];

    const updatedRestaurants = restaurants.filter((restaurant) => restaurant.name !== name);

    window.localStorage.setItem(KEY, JSON.stringify(updatedRestaurants));
    ToastMessage().render(`${name} 식당이 삭제되었습니다.`);
  }
};

export default restaurantAPI;
