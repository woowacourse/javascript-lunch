import { RestaurantType } from '../type';
import { getListOnLocalStorage } from '../utils/localStorage';
import { FILTER_OPTION } from '../constants/filter';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';

export const sortByName = (allRestaurants: RestaurantType[]) => {
  return allRestaurants.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }

    if (a.name < b.name) {
      return -1;
    }

    return 0;
  });
};

export const sortByDistance = (allRestaurants: RestaurantType[]) => {
  return allRestaurants.sort((a, b) => Number(a.distance) - Number(b.distance));
};
