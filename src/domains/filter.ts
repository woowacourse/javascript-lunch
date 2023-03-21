import { getListOnLocalStorage } from '../utils/localStorage';
import { RestaurantType, SortBy, SortingOption } from '../type/types';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { components } from '../components/components';

const sortBy: SortBy = {
  name: (list: RestaurantType[]) => {
    return list.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  },
  distance: (list: RestaurantType[]) => {
    return list.sort((a, b) => Number(a.distance) - Number(b.distance));
  },
};

const sortByCategory = (list: RestaurantType[], category: SortingOption) => {
  return category === '전체' ? list : list.filter(restaurant => restaurant.category === category);
};

export const sortByOption = (sortingOption: SortingOption) => {
  const restaurantList = getListOnLocalStorage<RestaurantType>(LOCAL_STORAGE_KEY.RESTAURANT_LIST);

  const sortByFunction = sortBy[sortingOption];

  const list = sortByFunction
    ? sortByFunction(restaurantList)
    : sortByCategory(restaurantList, sortingOption);

  components.restaurantList.render(list);
};
