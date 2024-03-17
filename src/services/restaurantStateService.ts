import { All, Category, SortType } from '../types';
import localStorageHandler from './localStorageHandler';
import { RestaurantState } from '../types/index.d';

const restaurantStorage = () => {
  const store = localStorageHandler('restaurantList');

  const filterByCategory = (category: Category | All) => {
    if (category === '전체') {
      return store.get()!;
    }
    return store.get()!.filter((restaurant) => restaurant.category === category);
  };

  const sortBySelectedValue = (selectedValue: SortType) => {
    if (selectedValue === 'name') {
      [...(store.get() ?? [])].sort((a, b) => a.name.localeCompare(b.name));
    }
    return [...(store.get() ?? [])].sort((a, b) => {
      if (a.distance === b.distance) {
        return a.name.localeCompare(b.name);
      }
      return a.distance - b.distance;
    });
  };

  const updateFavorite = (targetRestaurantId: number) => {
    const updatedList: RestaurantState[] = (store.get() ?? []).map((restaurant: RestaurantState) =>
      restaurant.id === targetRestaurantId ? { ...restaurant, isFavorited: !restaurant.isFavorited } : restaurant,
    );
    store.set(updatedList);
  };

  const updateNewRestaurant = (newRestaurant: RestaurantState) => {
    store.set([...(store.get() ?? []), newRestaurant]);
  };

  return { filterByCategory, sortBySelectedValue, updateFavorite, updateNewRestaurant };
};

export default restaurantStorage;
