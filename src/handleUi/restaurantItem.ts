import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { getListOnLocalStorage } from '../utils/localStorage';

export const handleRestaurantItemClick = (event: Event) => {
  const target = event.target;

  if (target instanceof HTMLButtonElement) {
    const restaurantList = getListOnLocalStorage(
      LOCAL_STORAGE_KEY.RESTAURANT_LIST
    );
    const index = parseInt(target.name, 10);

    return restaurantList[index];
  }
};
