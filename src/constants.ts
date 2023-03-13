import type { Category, Sorting } from './type';

export const CATEGORY_NAME: Record<string, Category> = {
  all: '전체',
  korean: '한식',
  chinese: '중식',
  japanese: '일식',
  western: '양식',
  asian: '아시안',
  etc: '기타',
};

export const CATEGORY_IMAGE_URL: Record<string, string> = {
  [CATEGORY_NAME.korean]: './category-korean.png',
  [CATEGORY_NAME.chinese]: './category-chinese.png',
  [CATEGORY_NAME.japanese]: './category-japanese.png',
  [CATEGORY_NAME.western]: './category-western.png',
  [CATEGORY_NAME.asian]: './category-asian.png',
  [CATEGORY_NAME.etc]: './category-etc.png',
};

export const DEFAULT_CATEGORY: Category = CATEGORY_NAME.all;
export const DEFAULT_SORTING: Sorting = 'name';

export const CATEGORY_OPTIONS = [
  { value: '한식', content: '한식' },
  { value: '중식', content: '중식' },
  { value: '일식', content: '일식' },
  { value: '양식', content: '양식' },
  { value: '아시안', content: '아시안' },
  { value: '기타', content: '기타' },
];

export const SORTING_OPTIONS = [
  { value: 'name', content: '이름순' },
  { value: 'takeMinute', content: '거리순' },
];

export const TAKE_MINUTE_OPTIONS = [
  { value: '5', content: '5분 내' },
  { value: '10', content: '10분 내' },
  { value: '15', content: '15분 내' },
  { value: '20', content: '20분 내' },
  { value: '30', content: '30분 내' },
];
