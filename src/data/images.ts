import addButtonImg from './images/add-button.png';
import categoryAsianImg from './images/category-asian.png';
import categoryChineseImg from './images/category-chinese.png';
import categoryEtcImg from './images/category-etc.png';
import categoryJapaneseImg from './images/category-japanese.png';
import categoryKoreanImg from './images/category-korean.png';
import categoryWesternImg from './images/category-western.png';
import { TCategory } from '../domain/RestaurantListItem';

export const Button = {
  add: addButtonImg,
};

export const CategoryImgs: Record<TCategory, string> = {
  아시안: categoryAsianImg,
  중식: categoryChineseImg,
  기타: categoryEtcImg,
  일식: categoryJapaneseImg,
  한식: categoryKoreanImg,
  양식: categoryWesternImg,
};
