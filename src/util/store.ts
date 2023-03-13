import { LIST_KEY } from "../constant/variables";
import { RestaurantInfo } from "../types/restaurant";

const store = {
  setLocalStorage(list: []): void {
    localStorage.setItem(LIST_KEY, JSON.stringify(list));
  },

  getLocalStorage(): object[] {
    const item = localStorage.getItem(LIST_KEY);
    if (!item) return [];
    return JSON.parse(item);
  },

  addRestaurant(newRestaurant: RestaurantInfo): void {
    const list = this.getLocalStorage();
    localStorage.setItem(LIST_KEY, JSON.stringify([...list, newRestaurant]));
  },
};

export default store;
