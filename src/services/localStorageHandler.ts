import { RestaurantState } from '../types/index.d';

const localStorageHandler = (key: string) => {
  let cache: RestaurantState[] | null;

  const get = () => {
    if (cache === undefined) {
      const item = localStorage.getItem(key);
      cache = item ? JSON.parse(item) : null;
    }
    return cache;
  };

  const set = (value: any) => {
    cache = value;
    localStorage.setItem(key, JSON.stringify(value));
  };

  const remove = () => {
    cache = null;
    localStorage.removeItem(key);
  };

  return { get, set, remove };
};

export default localStorageHandler;
