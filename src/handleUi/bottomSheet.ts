import RestaurantManager from '../domains/RestaurantManager';
import { isRestaurantList } from '../type/customTypeGuards';
import { getListOnLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { RestaurantType } from '../type/types';

const deleteFavoriteItem = (
  {
    restaurantList,
    favoriteList,
  }: { restaurantList: RestaurantType[]; favoriteList: RestaurantType[] },
  index: number,
  restaurantManager: RestaurantManager
) => {
  const favoriteIndex = favoriteList.findIndex(
    favorite => favorite.name === restaurantList[index].name
  );

  favoriteList.splice(favoriteIndex, 1);
  favoriteList.forEach((favorite, i) => (favorite.number = i));
  restaurantManager.updateFavoriteList(favoriteList);
};

const deleteRestaurantItem = (
  restaurantList: RestaurantType[],
  index: number,
  restaurantManager: RestaurantManager
) => {
  restaurantList.splice(index, 1);
  restaurantList.forEach((restaurant, i) => (restaurant.number = i));
  restaurantManager.updateRestaurantList(restaurantList);
};

const deleteItem = (
  target: HTMLButtonElement,
  {
    restaurantList,
    favoriteList,
  }: { restaurantList: RestaurantType[]; favoriteList: RestaurantType[] },
  restaurantManager: RestaurantManager
) => {
  const index = parseInt(target.name, 10);

  if (restaurantList[index].isFavorite === true) {
    deleteFavoriteItem({ restaurantList, favoriteList }, index, restaurantManager);
  }
  deleteRestaurantItem(restaurantList, index, restaurantManager);
};

export const handleDeleteClick = (
  target: HTMLButtonElement,
  restaurantManager: RestaurantManager
) => {
  const restaurantList = getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST);
  const favoriteList = getListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST);

  if (isRestaurantList(restaurantList) && isRestaurantList(favoriteList)) {
    deleteItem(target, { restaurantList, favoriteList }, restaurantManager);
  }
};
