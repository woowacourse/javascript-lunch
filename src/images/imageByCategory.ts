import { toggleImageSource } from '@res/utils/domUtils';

interface ImageMap {
  [key: string]: string;
}

export const ImageByCategory: ImageMap = {
  한식: './category-korean.png',
  일식: './category-japanese.png',
  중식: './category-chinese.png',
  양식: './category-western.png',
  아시안: './category-asian.png',
  기타: './category-etc.png',
};

export const FavoriteImage: ImageMap = {
  favoriteOn: './favorite-icon-filled.png',
  favoriteOff: './favorite-icon-lined.png',
};

export const toggleFavoriteIcon = toggleImageSource({
  onImage: './favorite-icon-filled.png',
  offImage: './favorite-icon-lined.png',
});
