import { isRestaurantList } from '../type/customTypeGuards';
import { RestaurantType } from '../type/types';
import { getListOnLocalStorage } from '../utils/localStorage';
import { $, $$ } from '../utils/selector';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import RestaurantManager from '../domains/RestaurantManager';

export const handleFavoriteIconClick = (
  target: HTMLImageElement,
  restaurantManager: RestaurantManager
) => {
  const restaurantList = getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST);
  const favoriteList = getListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST);

  if (isRestaurantList(restaurantList) && isRestaurantList(favoriteList)) {
    const number = parseInt(target.className.split(' ')[1].split('-')[3], 10);

    if (toggleFavoriteIcon(number)) {
      addFavoriteItem({ restaurantList, favoriteList }, number);
    } else {
      removeFavoriteItem({ restaurantList, favoriteList }, number);
    }

    restaurantManager.updateList(restaurantList, LOCAL_STORAGE_KEY.RESTAURANT_LIST);
    restaurantManager.updateList(favoriteList, LOCAL_STORAGE_KEY.FAVORITE_LIST);
  }
};

const toggleFavoriteIcon = (number: number) => {
  $$(`.favorite-icon-filled-${number}`)?.forEach(element =>
    element.classList.toggle('favorite-icon-filled--open')
  );

  const isFilled = $(`.favorite-icon-filled-${number}`)?.classList.contains(
    'favorite-icon-filled--open'
  );

  return isFilled;
};

const isFavoriteItem = (favoriteList: RestaurantType[], selected: RestaurantType) => {
  return favoriteList.find(favorite => favorite.name === selected.name);
};

const addFavoriteItem = (
  {
    restaurantList,
    favoriteList,
  }: { restaurantList: RestaurantType[]; favoriteList: RestaurantType[] },
  number: number
) => {
  const selected = restaurantList[number];

  if (isFavoriteItem(favoriteList, selected)) {
    return;
  }
  favoriteList.push(selected);
  restaurantList[number].isFavorite = true;
  favoriteList[favoriteList.length - 1].isFavorite = true;
};

const removeFavoriteItem = (
  {
    restaurantList,
    favoriteList,
  }: { restaurantList: RestaurantType[]; favoriteList: RestaurantType[] },
  number: number
) => {
  restaurantList[number].isFavorite = false;
  const index = favoriteList.findIndex(favorite => favorite.name === restaurantList[number].name);
  favoriteList.splice(index, 1);
};
