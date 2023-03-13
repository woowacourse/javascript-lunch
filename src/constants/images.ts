import koreanCategoryIcon from '../../templates/category-korean.png';
import chineseCategoryIcon from '../../templates/category-chinese.png';
import japaneseCategoryIcon from '../../templates/category-japanese.png';
import westernCategoryIcon from '../../templates/category-western.png';
import asianCategoryIcon from '../../templates/category-asian.png';
import etcCategoryIcon from '../../templates/category-etc.png';
import favoriteIconFilled from '../../templates/favorite-icon-filled.png';
import favoriteIconLined from '../../templates/favorite-icon-lined.png';

export const RESTAURANT_IMAGE = {
  한식: koreanCategoryIcon,
  중식: chineseCategoryIcon,
  양식: westernCategoryIcon,
  일식: japaneseCategoryIcon,
  아시안: asianCategoryIcon,
  기타: etcCategoryIcon,
} as const;

export const FAVORITE = {
  FILLED: favoriteIconFilled,
  LINED: favoriteIconLined,
} as const;
