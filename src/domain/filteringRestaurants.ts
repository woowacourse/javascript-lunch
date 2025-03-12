import { Restaurant } from '../../types/domain';

type FilteringKey = string;

function filteringRestaurants(filteringKey: FilteringKey, restaurants: Restaurant[]) {
  if (filteringKey) {
    return restaurants.filter((restaurant) => restaurant.category === filteringKey);
  }

  return restaurants;
}

export default filteringRestaurants;
