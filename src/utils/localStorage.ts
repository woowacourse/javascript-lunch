import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { RestaurantType } from '../type';

export const saveOnLocalStorage = (restaurantList: RestaurantType[]) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(restaurantList)
  );
};

export const getAllDataOnLocalStorage = (): RestaurantType[] => {
  return Object.values(
    JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '')
  );
};
