import { FILTER_OPTION } from '../constants/filter';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { RestaurantType } from '../type/types';
import { getListOnLocalStorage } from '../utils/localStorage';

const filter = {
  sortByOption(sortingOption: string) {
    const restaurantList = getListOnLocalStorage(
      LOCAL_STORAGE_KEY.RESTAURANT_LIST
    ) as RestaurantType[];

    if (sortingOption === FILTER_OPTION.NAME) {
      return sortByName(restaurantList);
    }

    if (sortingOption === FILTER_OPTION.DISTANCE) {
      return sortByDistance(restaurantList);
    }

    if (sortingOption !== FILTER_OPTION.ALL_CATEGORIES) {
      return sortByCategories(restaurantList, sortingOption);
    }

    return restaurantList;
  },
};

const sortByName = (restaurantList: RestaurantType[]) => {
  return restaurantList.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }

    if (a.name < b.name) {
      return -1;
    }

    return 0;
  });
};

const sortByDistance = (restaurantList: RestaurantType[]) => {
  return restaurantList.sort((a, b) => Number(a.distance) - Number(b.distance));
};

const sortByCategories = (
  restaurantList: RestaurantType[],
  sortingOption: string
): RestaurantType[] => {
  return restaurantList.filter(
    restaurant => restaurant.category === sortingOption
  );
};

export default filter;
