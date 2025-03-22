import { Restaurant } from '../../types/domain';

type FilteringKey = string;

function filterByCategory(filteringKey: FilteringKey, restaurants: Restaurant[]) {
  if (filteringKey) {
    return restaurants.filter((restaurant) => restaurant.category === filteringKey);
  }

  return restaurants;
}

export default filterByCategory;
