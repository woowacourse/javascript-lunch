import { Restaurant } from '../type/Restaurant';
export const RestaurantLocalStorage = {
  saveList: (key: string, list: Restaurant[]) => {
    localStorage.setItem(key, JSON.stringify(list));
  },

  loadList: (key: string): Restaurant[] => JSON.parse(localStorage.getItem(key) ?? '[]'),
};
