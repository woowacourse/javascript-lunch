import { Restaurant } from '../type/Restaurant';
export const RestaurantStorage = {
  saveList: (key: 'restaurantList', list: Restaurant[]) => {
    localStorage.setItem(key, JSON.stringify(list));
  },

  loadList: (key: 'restaurantList'): Restaurant[] => JSON.parse(localStorage.getItem(key) ?? '[]'),
};
