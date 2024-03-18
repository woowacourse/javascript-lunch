import { StorageKeyEnum } from '../constants';
import { RestaurantInfo } from '../types';
import FilteringController from './FilteringController';
import { findParentBox } from '../utils';
import LocalStorageService from './LocalStorageService';

const ChangeLikeDataController = {
  toggleLikeStatus(event: MouseEvent, findParentTagName: string) {
    const clickedEl = event.target as HTMLElement;
    const clickedRestaurantEl = findParentBox(clickedEl, findParentTagName);
    const clickedRestaurantElName = clickedRestaurantEl?.getAttribute('name');

    if (
      clickedEl.getAttribute('class') === 'star-btn__img' &&
      clickedRestaurantElName &&
      clickedRestaurantEl
    ) {
      changeLikeData(clickedRestaurantElName);
    }
  },
};

function changeLikeData(restaurantName: string) {
  const storeData: RestaurantInfo[] = LocalStorageService.getData(
    StorageKeyEnum.restaurants,
  );

  if (storeData !== null) {
    const restaurant = storeData.find((item) => item.name === restaurantName);

    if (restaurant && 'like' in restaurant) {
      restaurant.like = !restaurant.like;

      LocalStorageService.setData(StorageKeyEnum.restaurants, storeData);
      FilteringController.showFilteredSortedList();
    }
  }
}

export default ChangeLikeDataController;
