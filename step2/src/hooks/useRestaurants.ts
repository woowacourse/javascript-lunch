import { Category, Sorting } from '../types/restaurants';
import { getStorage } from '../utils/@common/localStorage';

const useRestaurants = (category: Category, sorting: Sorting) => {
  const getFilteredRestaurants = () => {
    let filtered =
      category === '전체'
        ? getStorage()
        : getStorage()?.filter(
            (restaurant) => restaurant.category === category
          );

    return filtered?.sort((a, b) => {
      if (sorting === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.distance - b.distance;
    });
  };

  return { getFilteredRestaurants };
};

export default useRestaurants;
