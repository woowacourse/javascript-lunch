import { ERROR_MESSAGE } from '../../constants/messages';
import { RestaurantType } from '../../types/restaurants';

const STORAGE_KEY = 'restaurant';

export const saveStorage = (data: RestaurantType[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('저장 완료');
  } catch (error) {
    console.error(ERROR_MESSAGE.SAVE_LOCAL_STORAGE);
  }
};

export const getStorage = (): RestaurantType[] | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    console.log('가져오기 완료');
    return data && JSON.parse(data);
  } catch (error) {
    console.error(ERROR_MESSAGE.GET_LOCAL_STORAGE);
    return null;
  }
};
