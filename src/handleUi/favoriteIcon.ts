import { isRestaurantList } from '../type/customTypeGuards';
import { FavoriteItem, HandleFavoriteIconClick, RestaurantType } from '../type/types';
import { getListOnLocalStorage } from '../utils/localStorage';
import { $, $$ } from '../utils/selector';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';

const toggleFavoriteIcon = (number: number) => {
  const filledIconList = $$(`.favorite-icon-filled-${number}`);
  if (filledIconList) {
    filledIconList.forEach(filledIcon => filledIcon.classList.toggle('favorite-icon-filled--open'));
  }

  const filledIcon = $(`.favorite-icon-filled-${number}`);
  if (filledIcon) {
    const isFilled = filledIcon.classList.contains('favorite-icon-filled--open');

    return isFilled;
  }
};

const isFavoriteItem = (favoriteList: RestaurantType[], selected: RestaurantType) => {
  return favoriteList.find(favorite => favorite.name === selected.name);
};

const addFavoriteItem: FavoriteItem = ({ restaurantList, favoriteList }, index) => {
  const selected = restaurantList[index];

  if (isFavoriteItem(favoriteList, selected)) {
    return;
  }

  favoriteList.push(selected);
  restaurantList[index].isFavorite = true;
  favoriteList[favoriteList.length - 1].isFavorite = true;
};

const removeFavoriteItem: FavoriteItem = ({ restaurantList, favoriteList }, index) => {
  restaurantList[index].isFavorite = false;

  const foundIndex = favoriteList.findIndex(
    favorite => favorite.name === restaurantList[index].name
  );

  favoriteList.splice(foundIndex, 1);
};

export const handleFavoriteIconClick: HandleFavoriteIconClick = (target, restaurantManager) => {
  const restaurantList = getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST);
  const favoriteList = getListOnLocalStorage(LOCAL_STORAGE_KEY.FAVORITE_LIST);

  if (isRestaurantList(restaurantList) && isRestaurantList(favoriteList)) {
    const restaurantNumber = parseInt(target.className.split(' ')[1].split('-')[3], 10);

    if (toggleFavoriteIcon(restaurantNumber))
      addFavoriteItem({ restaurantList, favoriteList }, restaurantNumber);
    else removeFavoriteItem({ restaurantList, favoriteList }, restaurantNumber);

    restaurantManager.updateList(restaurantList, LOCAL_STORAGE_KEY.RESTAURANT_LIST);
    restaurantManager.updateList(favoriteList, LOCAL_STORAGE_KEY.FAVORITE_LIST);
  }
};
