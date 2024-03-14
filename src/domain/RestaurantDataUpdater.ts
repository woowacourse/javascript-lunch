import { LOCAL_STORAGE_KEYS } from '../constants/localStorageKeys';
import { Restaurant } from '../types';

type RestaurantDataUpdaterType = {
  updateLiked: ({ name }: UpdateLikedProps) => void;
};

type UpdateLikedProps = {
  name: string;
};

const RestaurantDataUpdater: RestaurantDataUpdaterType = {
  updateLiked({ name }: UpdateLikedProps) {
    const restaurants = localStorage.getItem(LOCAL_STORAGE_KEYS.restaurants);
    const allRestaurants = JSON.parse(restaurants ?? '[]');
    const updatedAllRestaurants = allRestaurants.map((restaurant: Restaurant) => {
      if (restaurant.name === name) {
        restaurant.liked = !restaurant.liked;
      }
      return restaurant;
    });
    localStorage.setItem(LOCAL_STORAGE_KEYS.restaurants, JSON.stringify(updatedAllRestaurants));
  },
};

export default RestaurantDataUpdater;
