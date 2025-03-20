import { getLocalStorage, LOCAL_STORAGE_KEYS, setLocalStorage } from '../util/localStorage';
import { getAllRestaurants } from './restaurantService';
import { Restaurant } from '../type';

export async function getFavoriteRestaurants(): Promise<Restaurant[]> {
  const favoriteIds = getLocalStorage<number[]>(LOCAL_STORAGE_KEYS.FAVORITE, []);
  const allRestaurants = await getAllRestaurants();
  return allRestaurants.filter((restaurant) => favoriteIds.includes(restaurant.id));
}

export async function isRestaurantFavorite(id: number): Promise<boolean> {
  const favoriteIds = getLocalStorage<number[]>(LOCAL_STORAGE_KEYS.FAVORITE, []);
  return favoriteIds.includes(id);
}

export async function updateFavoriteStatus(id: number): Promise<boolean> {
  const favoriteIds = getLocalStorage<number[]>(LOCAL_STORAGE_KEYS.FAVORITE, []);
  const updatedFavorites = favoriteIds.includes(id)
    ? favoriteIds.filter((favId) => favId !== id)
    : [...favoriteIds, id];

  setLocalStorage(LOCAL_STORAGE_KEYS.FAVORITE, updatedFavorites);
  return updatedFavorites.includes(id);
}
