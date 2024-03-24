import connectedCollection, { databaseType } from '../api/Collection';
import { Restaurant } from '../types/Restaurant';

interface RestaurantRegistryProps {
  restaurant: Restaurant;
  database?: databaseType;
}
const RestaurantRegistry = {
  registerOneRestaurant({ restaurant, database }: RestaurantRegistryProps) {
    connectedCollection.setOneItem({ restaurant, database });
  },

  deleteOneRestaurant({ restaurant, database }: RestaurantRegistryProps) {
    connectedCollection.deleteOneItem({ restaurant, database });
    this.unlikeOneRestaurant({ restaurant });
  },

  unlikeOneRestaurant({ restaurant }: RestaurantRegistryProps) {
    connectedCollection.deleteOneItem({ restaurant, database: 'liked' });
  },

  hasOneRestaurant({ restaurant, database }: RestaurantRegistryProps) {
    return connectedCollection.hasOneItem({ restaurant, database });
  },
};

export default RestaurantRegistry;
