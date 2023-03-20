import { components } from '../components/components';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { isRestaurant } from '../type/customTypeGuards';
import { getListOnLocalStorage } from '../utils/localStorage';
import { handleModalOpen } from './modal';

export const handleRestaurantItemClick = (target: HTMLButtonElement) => {
  const restaurantList = getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST);
  const index = parseInt(target.name, 10);
  const restaurant = restaurantList[index];

  handleModalOpen('#restaurant-bottom-sheet');
  if (isRestaurant(restaurant)) {
    components.restaurantBottomSheetContent.render(restaurant);
  }
};
