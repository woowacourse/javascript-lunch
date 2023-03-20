import { FavoriteItem, HandleFavoriteIconClick, RestaurantType } from '../type/types';
import { getListOnLocalStorage } from '../utils/localStorage';
import { $, $$ } from '../utils/selector';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import { components } from '../components/components';

const isFavoriteItem = (favoriteList: RestaurantType[], selected: RestaurantType) => {
  return favoriteList.find(favorite => favorite.name === selected.name);
};

const removeFavoriteItem: FavoriteItem = ({ restaurantList, favoriteList }, index): void => {
  restaurantList[index].isFavorite = false;

  const foundIndex = favoriteList.findIndex(
    favorite => favorite.name === restaurantList[index].name
  );

  favoriteList.splice(foundIndex, 1);

  if (!favoriteList.length) {
    components.restaurantListContainer.renderEmptyTemplate();
  } else {
    components.restaurantList.render(favoriteList);
  }
};

const addFavoriteItem: FavoriteItem = ({ restaurantList, favoriteList }, index): void => {
  const selected = restaurantList[index];

  if (isFavoriteItem(favoriteList, selected)) {
    return;
  }

  favoriteList.push(selected);
  restaurantList[index].isFavorite = true;
  favoriteList[favoriteList.length - 1].isFavorite = true;
};

const toggleIcon = (number: number): void => {
  const filledIconList = $$(`.favorite-icon-filled-${number}`);
  if (filledIconList) {
    filledIconList.forEach(filledIcon => filledIcon.classList.toggle('favorite-icon-filled--open'));
  }
};

const isFilledIcon = (number: number): boolean => {
  const filledIcon = $(`.favorite-icon-filled-${number}`);
  if (filledIcon) {
    return filledIcon.classList.contains('favorite-icon-filled--open');
  }

  return false;
};

export const handleFavoriteIconClick: HandleFavoriteIconClick = (target, restaurantManager) => {
  const restaurantList = getListOnLocalStorage<RestaurantType>(LOCAL_STORAGE_KEY.RESTAURANT_LIST);
  const favoriteList = getListOnLocalStorage<RestaurantType>(LOCAL_STORAGE_KEY.FAVORITE_LIST);

  const restaurantNumber = parseInt(target.className.split(' ')[1].split('-')[3], 10);

  toggleIcon(restaurantNumber);

  if (isFilledIcon(restaurantNumber)) {
    addFavoriteItem({ restaurantList, favoriteList }, restaurantNumber);
  } else {
    removeFavoriteItem({ restaurantList, favoriteList }, restaurantNumber);
  }

  restaurantManager.updateList(restaurantList, LOCAL_STORAGE_KEY.RESTAURANT_LIST);
  restaurantManager.updateList(favoriteList, LOCAL_STORAGE_KEY.FAVORITE_LIST);
};
