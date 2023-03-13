import { RestaurantType } from './types';

export const isRestaurant = (restaurant: any): restaurant is RestaurantType => {
  return (
    'number' in restaurant &&
    'category' in restaurant &&
    'name' in restaurant &&
    'distance' in restaurant &&
    'description' in restaurant &&
    'link' in restaurant &&
    'isFavorite' in restaurant
  );
};

export const isRestaurantList = (
  restaurantList: any
): restaurantList is RestaurantType[] => {
  return restaurantList.every((restaurant: any) => isRestaurant(restaurant));
};
