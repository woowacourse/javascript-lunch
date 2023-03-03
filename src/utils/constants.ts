import { Category, Distance } from '../type';

export const CATEGORY_NAME: { [key: string]: Category } = {
  all: '전체',
  korean: '한식',
  chinese: '중식',
  japanese: '일식',
  western: '양식',
  asian: '아시안',
  etc: '기타',
};

export const CATEGORIES: Category[] = [
  CATEGORY_NAME.all,
  CATEGORY_NAME.korean,
  CATEGORY_NAME.chinese,
  CATEGORY_NAME.japanese,
  CATEGORY_NAME.western,
  CATEGORY_NAME.asian,
  CATEGORY_NAME.etc,
];

export const CATEGORY_IMAGE_URL: { [key: string]: string } = {
  [CATEGORY_NAME.korean]: './category-korean.png',
  [CATEGORY_NAME.chinese]: './category-chinese.png',
  [CATEGORY_NAME.japanese]: './category-japanese.png',
  [CATEGORY_NAME.western]: './category-western.png',
  [CATEGORY_NAME.asian]: './category-asian.png',
  [CATEGORY_NAME.etc]: './category-etc.png',
};

export const DEFAULT_CATEGORY: Category = CATEGORY_NAME.all;
export const DEFAULT_DISTANCE: Distance = 5;
