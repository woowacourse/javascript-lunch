import { Category, Distance, RestaurantType } from '../types/restaurants';
import { getStorage, saveStorage } from '../utils/@common/localStorage';

interface UseRestaurantFormReturn {
  addRestaurant: (formData: FormData) => void;
}

function useRestaurantForm(): UseRestaurantFormReturn {
  const addRestaurant = (formData: FormData) => {
    const existingRestaurants = getStorage() || [];

    const newRestaurant: RestaurantType = {
      category: formData.get('category') as Category,
      name: formData.get('name') as string,
      distance: formData.get('distance') as unknown as Distance,
      description: formData.get('description') as string,
      link: formData.get('link') as string,
      isFavorite: false,
    };

    const updatedRestaurants = [...existingRestaurants, newRestaurant];

    saveStorage(updatedRestaurants);
  };

  return { addRestaurant };
}

export default useRestaurantForm;
