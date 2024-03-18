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

  const set = (restaurant: RestaurantState[] | RestaurantState) => {
    const prevData = JSON.parse(localStorage.getItem(key)!);
    const lastElementId = prevData.length > 0 ? prevData[prevData.length - 1].id : 0;
    const newRestaurant = { ...restaurant, id: lastElementId + 1 };
    const newData = [...prevData, newRestaurant];
    cache = newData;
    localStorage.setItem(key, JSON.stringify(newData));
  };

  const remove = () => {
    cache = null;
    localStorage.removeItem(key);
  };

  return { get, set, remove };
};

export default localStorageHandler;
