import '../../assets/category-etc.png';
import '../../assets/category-korean.png';
import '../../assets/category-chinese.png';
import '../../assets/category-japanese.png';
import '../../assets/category-western.png';
import '../../assets/category-asian.png';
import { Category } from '../../constants/lunchRecommendation';

const src: Record<Category, `./category-${string}.png`> = {
  전체: './category-all.png',
  기타: './category-etc.png',
  한식: './category-korean.png',
  중식: './category-chinese.png',
  일식: './category-japanese.png',
  양식: './category-western.png',
  아시안: './category-asian.png',
};

const getImageSrc = (category: Category) => src[category];

export { getImageSrc };
