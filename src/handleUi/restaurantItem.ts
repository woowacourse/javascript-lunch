import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { getListOnLocalStorage } from '../utils/localStorage';

export const handleRestaurantItemClick = (target: HTMLButtonElement) => {
  const restaurantList = getListOnLocalStorage(
    LOCAL_STORAGE_KEY.RESTAURANT_LIST
  );
  const index = parseInt(target.name, 10);
  const restaurant = restaurantList[index];

  return restaurant;
};
