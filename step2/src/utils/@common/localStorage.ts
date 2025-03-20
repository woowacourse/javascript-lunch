import { STORAGE_KEY } from '../../constants/key';
import { ERROR_MESSAGE } from '../../constants/messages';
import { RestaurantType } from '../../types/restaurants';

export const saveStorage = (data: RestaurantType[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error(ERROR_MESSAGE.SAVE_LOCAL_STORAGE);
  }
};

export const getStorage = (): RestaurantType[] | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error(ERROR_MESSAGE.GET_LOCAL_STORAGE);
    return null;
  }
};
