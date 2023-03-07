import { FILTER_OPTION } from '../constants/filter';
import { RestaurantType } from '../type';
import { getListOnLocalStorage } from '../utils/localStorage';
import RestaurantList from '../components/restaurantList.js';
import { LOCAL_STORAGE_KEY } from '../constants/values';

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

export const filterCategory = (selectedCategory: string) => {
  const restaurantList = getListOnLocalStorage(
    LOCAL_STORAGE_KEY
  ) as RestaurantType[];
  const restaurantListComponent = new RestaurantList();

  if (selectedCategory === FILTER_OPTION.ALL_CATEGORIES) {
    return restaurantListComponent.render(restaurantList);
  }

  const filteredList = restaurantList.filter(
    restaurant => restaurant.category === selectedCategory
  );

  restaurantListComponent.render(filteredList);
};
