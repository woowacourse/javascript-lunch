import { StorageType } from '../types/types';

const LocalStorage: StorageType = {
  getItem<T>(key: string) {
    const localItem = localStorage.getItem(key);
    return localItem ? (JSON.parse(localItem) as T) : null;
  },

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem(key) {
    localStorage.removeItem(key);
  },
};

export default LocalStorage;
