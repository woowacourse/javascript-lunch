import '../../assets/category-etc.png';
import '../../assets/category-korean.png';
import '../../assets/category-chinese.png';
import '../../assets/category-japanese.png';
import '../../assets/category-western.png';
import '../../assets/category-asian.png';
import '../../assets/favorite-icon-filled.png';
import '../../assets/favorite-icon-lined.png';

import { Category } from '../../constants/lunchRecommendation';

const categorySrc: Record<Category, `./category-${string}.png`> = {
  전체: './category-all.png',
  기타: './category-etc.png',
  한식: './category-korean.png',
  중식: './category-chinese.png',
  일식: './category-japanese.png',
  양식: './category-western.png',
  아시안: './category-asian.png',
};

export const favoriteIconSrc: Record<string, `./favorite-icon-${string}.png`> = {
  lined: './favorite-icon-filled.png',
  filled: './favorite-icon-lined.png',
};

const getCategoryImageSrc = (category: Category) => categorySrc[category];

const getFavoriteIconSrc = (imageSrc: string) => {
  const iconStyle = imageSrc.split('-')[2].split('.')[0];
  return favoriteIconSrc[iconStyle];
};

export { getCategoryImageSrc, getFavoriteIconSrc };
