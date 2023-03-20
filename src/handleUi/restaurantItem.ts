import { components } from '../components/components';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { RestaurantType } from '../type/types';
import { getListOnLocalStorage } from '../utils/localStorage';
import { handleModalOpen } from './modal';

export const handleRestaurantItemClick = (target: HTMLButtonElement) => {
  const restaurantList = getListOnLocalStorage<RestaurantType>(LOCAL_STORAGE_KEY.RESTAURANT_LIST);
  const index = parseInt(target.name, 10);
  const restaurant = restaurantList[index];

  handleModalOpen('#restaurant-bottom-sheet');
  components.restaurantBottomSheetContent.render(restaurant);
};
