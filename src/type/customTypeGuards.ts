import { RestaurantType, SortingOption } from './types';

const restaurantKeys = [
  'restaurantNumber',
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

const sortingOptionKeys = [
  'name',
  'distance',
  '한식',
  '중식',
  '일식',
  '양식',
  '아시안',
  '기타',
  '전체',
];

export const isSortingOption = (sortingOption: unknown): sortingOption is SortingOption => {
  const value = sortingOption as SortingOption;

  return sortingOptionKeys.includes(value);
};
