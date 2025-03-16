import type { Restaurant } from "../../types/restaurantTypes";

const StorageManager = {
  getItem(key: string, defaultValue: string | Array<Restaurant>) {
    const value = localStorage.getItem(key);
    if (value === null) {
      return defaultValue;
    }
    try {
      return JSON.parse(value);
    } catch (error) {
      return defaultValue;
    }
  },

  setItem(key: string, value: string | Array<Restaurant>) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};
export default StorageManager;
