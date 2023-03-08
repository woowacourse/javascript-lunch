import { LIST } from "../constant/variables";
import { RestaurantInfo } from "../types/restaurant";

const store = {
  setLocalStorage(list: []): void {
    localStorage.setItem(LIST, JSON.stringify(list));
  },

  getLocalStorage(): object[] {
    const item = localStorage.getItem(LIST);
    if (!item) return [];
    return JSON.parse(item);
  },

  addRestaurant(newRestaurant: RestaurantInfo): void {
    const list = this.getLocalStorage();
    localStorage.setItem(LIST, JSON.stringify([...list, newRestaurant]));
  },
};

export default store;
