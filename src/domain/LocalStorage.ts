import { StorageType } from '../types/types';

const LocalStorage = <T>(): StorageType<T> => ({
  getItem(key: string): T | null {
    const localItem = localStorage.getItem(key);
    return localItem ? (JSON.parse(localItem) as T) : null;
  },

  setItem(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  },
});

export default LocalStorage;
