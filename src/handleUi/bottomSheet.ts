import restaurantManager from '../domains/RestaurantManager';
import { isRestaurantList } from '../type/customTypeGuards';
import { getListOnLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { RestaurantType } from '../type/types';

export const handleDeleteClick = (
  target: HTMLButtonElement,
  RestaurantManager: restaurantManager
) => {
  const restaurantList = getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST);
  const favoriteList = getListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST);

  if (isRestaurantList(restaurantList) && isRestaurantList(favoriteList)) {
    deleteItem(target, { restaurantList, favoriteList }, RestaurantManager);
  }
};

const deleteItem = (
  target: HTMLButtonElement,
  {
    restaurantList,
    favoriteList,
  }: { restaurantList: RestaurantType[]; favoriteList: RestaurantType[] },
  RestaurantManager: restaurantManager
) => {
  const index = parseInt(target.name, 10);

  if (restaurantList[index].isFavorite === true) {
    deleteFavoriteItem({ restaurantList, favoriteList }, index, RestaurantManager);
  }
  deleteRestaurantItem(restaurantList, index, RestaurantManager);
};

const deleteFavoriteItem = (
  {
    restaurantList,
    favoriteList,
  }: { restaurantList: RestaurantType[]; favoriteList: RestaurantType[] },
  index: number,
  RestaurantManager: restaurantManager
) => {
  const favoriteIndex = favoriteList.findIndex(
    favorite => favorite.name === restaurantList[index].name
  );

  favoriteList.splice(favoriteIndex, 1);
  favoriteList.forEach((favorite, i) => (favorite.number = i));
  RestaurantManager.updateFavoriteList(favoriteList);
};

const deleteRestaurantItem = (
  restaurantList: RestaurantType[],
  index: number,
  RestaurantManager: restaurantManager
) => {
  restaurantList.splice(index, 1);
  restaurantList.forEach((restaurant, i) => (restaurant.number = i));
  RestaurantManager.updateRestaurantList(restaurantList);
};
