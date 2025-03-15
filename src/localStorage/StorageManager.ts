import type { Restaurant } from "../../types/restaurantTypes";

const StorageManager = {
  getItem(key: string, defaultValue: string | Array<Restaurant>) {
    const value = localStorage.getItem(key);
    if (!value) return defaultValue;
    return JSON.parse(value);
  },

  setItem(key: string, value: string | Array<Restaurant>) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};
export default StorageManager;
