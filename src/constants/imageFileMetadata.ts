import { RestaurantCategory } from '../types';

type CategoryIconFileName = {
  [key in RestaurantCategory]: string;
};

type FavoriteIconMetadata = {
  [key in 'true' | 'false']: string;
};

export const categoryIconFileName: CategoryIconFileName = {
  한식: 'category-korean.png',
  중식: 'category-chinese.png',
  일식: 'category-japanese.png',
  아시안: 'category-asian.png',
  양식: 'category-western.png',
  기타: 'category-etc.png',
};

export const favoriteIconFileName: FavoriteIconMetadata = {
  true: 'favorite-icon-filled.png',
  false: 'favorite-icon-lined.png',
};

export const favoriteIconAlt: FavoriteIconMetadata = {
  true: 'favorite-icon-filled',
  false: 'favorite-icon-lined',
};
