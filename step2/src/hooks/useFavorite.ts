import { RestaurantType } from '../types/restaurants';
import { getStorage, saveStorage } from '../utils/@common/localStorage';

interface UseFavoriteReturn {
  handleFavoriteToggle: (
    name: string,
    favorite: boolean,
    setFavorite: (newState: boolean) => void
  ) => void;
}

const useFavorite = (): UseFavoriteReturn => {
  const handleFavoriteToggle = (
    name: string,
    favorite: boolean,
    setFavorite: (newState: boolean) => void
  ) => {
    const storedRestaurants = getStorage() || [];
    const newFavoriteState = !favorite;

    const updatedRestaurants = storedRestaurants.map(
      (restaurant: RestaurantType) =>
        restaurant.name === name
          ? { ...restaurant, isFavorite: newFavoriteState }
          : restaurant
    );

    saveStorage(updatedRestaurants);
    setFavorite(newFavoriteState);
  };

  return {
    handleFavoriteToggle,
  };
};

export default useFavorite;
