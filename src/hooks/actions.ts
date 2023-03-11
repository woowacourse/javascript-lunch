import { LOCAL_STORAGE_KEY } from '../constant';
import localMemory from '../data/localMemory';
import Restaurants from '../domain/Restaurants';
import { Restaurant, RestaurantCategoryType, StoreType } from '../type/common';
import store from './store';

const actions = {
  getValue: <T extends keyof StoreType>(key: T): StoreType[T] => {
    return store[key];
  },

  setValue: <T extends keyof StoreType>(key: T, value: StoreType[T]) => {
    store[key] = value;
  },

  reset() {
    store.domain = new Restaurants();

    localMemory
      .getData(LOCAL_STORAGE_KEY)
      ?.forEach((restaurant: Restaurant) => {
        if (!store.domain) return;

        store.domain.addRestaurant(restaurant);
      });

    actions.setValue('restaurants', store.domain.getRestaurants());
  },

  sortRestaurantsName() {
    if (!store.domain) return;

    actions.setValue('restaurants', store.domain.sortByName());
    actions.setValue('sortSelector', 'name');
  },

  sortRestaurantsDistance() {
    if (!store.domain) return;

    actions.setValue('restaurants', store.domain.sortByDistance());
    actions.setValue('sortSelector', 'distance');
  },

  filterRestaurantsCategory(category: string) {
    if (!store.domain) return;

    actions.setValue('restaurants', store.domain.filterByCategory(category));
    actions.setValue('categorySelector', category as RestaurantCategoryType);
    actions.setValue('isFavorite', false);
  },

  addRestaurant(restaurant: Restaurant) {
    if (!store.domain) return;

    store.domain.addRestaurant(restaurant);

    localMemory.setData(LOCAL_STORAGE_KEY, store.domain.getRestaurants());
  },

  filterFavoriteRestaurnats() {
    if (!store.domain) return;

    actions.setValue('restaurants', store.domain.filterByFavorite());
    actions.setValue('isFavorite', true);

    localMemory.setData(LOCAL_STORAGE_KEY, store.domain.getRestaurants());
  },

  checkFavoritRestaurant(id: number) {
    if (!store.domain) return;

    actions.setValue('restaurants', store.domain.checkFavorite(id));

    localMemory.setData(LOCAL_STORAGE_KEY, store.domain.getRestaurants());
  },

  removeRestaurant(id: number) {
    if (!store.domain) return;

    store.domain.removeRestaurant(id);

    actions.setValue('restaurants', store.domain.getRestaurants());
    localMemory.setData(LOCAL_STORAGE_KEY, store.domain.getRestaurants());
  },
};

export default actions;
