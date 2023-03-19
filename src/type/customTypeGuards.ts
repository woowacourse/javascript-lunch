import { RestaurantType } from './types';

const restaurantKeys = [
  'number',
  'category',
  'name',
  'distance',
  'description',
  'link',
  'isFavorite',
];

export const isRestaurant = (restaurant: unknown): restaurant is RestaurantType => {
  const localRestaurant = restaurant as RestaurantType;

  return restaurantKeys.every(key => key in localRestaurant);
};

export const isRestaurantList = (restaurantList: unknown): restaurantList is RestaurantType[] => {
  const localRestaurantList = restaurantList as RestaurantType[];

  return (
    Array.isArray(localRestaurantList) &&
    localRestaurantList.every(restaurant => isRestaurant(restaurant))
  );
};
