import { Category } from '../types/index';

const RESTAURANT_IMAGE: Record<Category, string> = {
  한식: './category-korean.png',
  중식: './category-chinese.png',
  일식: './category-japanese.png',
  아시안: './category-asian.png',
  양식: './category-western.png',
  기타: './category-etc.png',
};

const FAVORITE_ICON: Record<string, string> = {
  FAVORED: './favorite-icon-filled.png',
  UNFAVORED: './favorite-icon-lined.png',
};

function getFavoriteIcon(like: boolean) {
  if (like) return FAVORITE_ICON.FAVORED;

  return FAVORITE_ICON.UNFAVORED;
}

export { RESTAURANT_IMAGE, getFavoriteIcon };
