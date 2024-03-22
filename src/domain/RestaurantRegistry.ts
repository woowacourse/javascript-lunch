import { DEFAULT_COLLECTION, databaseType } from '../api/Collection';
import { Restaurant } from '../types/Restaurant';

interface RestaurantRegistryProps {
  restaurant: Restaurant;
  database?: databaseType;
}
const RestaurantRegistry = {
  registerOneRestaurant({ restaurant, database }: RestaurantRegistryProps) {
    const allRestaurants: Restaurant[] = JSON.parse(
      localStorage.getItem(database ?? DEFAULT_COLLECTION) ?? '[]',
    );
    allRestaurants.push(restaurant);
    localStorage.setItem(database ?? DEFAULT_COLLECTION, JSON.stringify(allRestaurants));
  },

  deleteOneRestaurant({ restaurant, database }: RestaurantRegistryProps) {
    if (this.hasOneRestaurant({ restaurant, database })) {
      const allRestaurants: Restaurant[] = JSON.parse(
        localStorage.getItem(database ?? DEFAULT_COLLECTION) ?? '[]',
      );
      const removedRestaurants = allRestaurants.filter((value) => value.name !== restaurant.name);
      localStorage.setItem(database ?? DEFAULT_COLLECTION, JSON.stringify(removedRestaurants));
    }
    this.unlikeOneRestaurant({ restaurant });
  },

  unlikeOneRestaurant({ restaurant }: RestaurantRegistryProps) {
    if (this.hasOneRestaurant({ restaurant, database: 'liked' })) {
      const likedRestaurants: Restaurant[] = JSON.parse(localStorage.getItem('liked') ?? '[]');
      const removedRestaurants = likedRestaurants.filter((value) => value.name !== restaurant.name);
      localStorage.setItem('liked', JSON.stringify(removedRestaurants));
    }
  },

  hasOneRestaurant({ restaurant, database }: RestaurantRegistryProps) {
    const allRestaurants: Restaurant[] = JSON.parse(
      localStorage.getItem(database ?? DEFAULT_COLLECTION) ?? '[]',
    );
    return allRestaurants.some((value) => value.name === restaurant.name);
  },
};

export default RestaurantRegistry;
