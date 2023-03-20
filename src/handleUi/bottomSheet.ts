import RestaurantManager from '../domains/RestaurantManager';
import { getListOnLocalStorage } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants/localStorage';
import {
  DeleteFavoriteItem,
  DeleteItem,
  DeleteRestaurantItem,
  HandleDeleteClick,
  RestaurantType,
} from '../type/types';
import { components } from '../components/components';

const deleteFavoriteItem: DeleteFavoriteItem = (
  { restaurantList, favoriteList, restaurantManager },
  index
) => {
  const favoriteIndex = favoriteList.findIndex(
    favorite => favorite.name === restaurantList[index].name
  );

  favoriteList.splice(favoriteIndex, 1);
  favoriteList.forEach((favorite, i) => (favorite.restaurantNumber = i));
  restaurantManager.updateList(favoriteList, LOCAL_STORAGE_KEY.FAVORITE_LIST);
};

const deleteRestaurantItem: DeleteRestaurantItem = (
  { restaurantList, restaurantManager },
  index
) => {
  restaurantList.splice(index, 1);
  restaurantList.forEach((restaurant, i) => (restaurant.restaurantNumber = i));
  restaurantManager.updateList(restaurantList, LOCAL_STORAGE_KEY.RESTAURANT_LIST);
};

const deleteItem: DeleteItem = (target, { restaurantList, favoriteList, restaurantManager }) => {
  const index = parseInt(target.name, 10);

  if (restaurantList[index].isFavorite === true) {
    deleteFavoriteItem({ restaurantList, favoriteList, restaurantManager }, index);
  }
  deleteRestaurantItem({ restaurantList, restaurantManager }, index);
};

export const handleDeleteClick: HandleDeleteClick = (
  target: HTMLButtonElement,
  restaurantManager: RestaurantManager
) => {
  const restaurantList = getListOnLocalStorage<RestaurantType>(LOCAL_STORAGE_KEY.RESTAURANT_LIST);
  const favoriteList = getListOnLocalStorage<RestaurantType>(LOCAL_STORAGE_KEY.FAVORITE_LIST);

  deleteItem(target, { restaurantList, favoriteList, restaurantManager });

  components.restaurantList.render(getListOnLocalStorage(LOCAL_STORAGE_KEY.RESTAURANT_LIST));
};
