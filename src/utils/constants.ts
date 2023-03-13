import { Category, Distance, SelectOption } from '../type';

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

export const FILTER_CATEGORY_OPTIONS: SelectOption[] = [
  {
    value: CATEGORY_NAME.all,
    textContent: CATEGORY_NAME.all,
  },
  {
    value: CATEGORY_NAME.korean,
    textContent: CATEGORY_NAME.korean,
  },
  {
    value: CATEGORY_NAME.chinese,
    textContent: CATEGORY_NAME.chinese,
  },
  {
    value: CATEGORY_NAME.japanese,
    textContent: CATEGORY_NAME.japanese,
  },
  {
    value: CATEGORY_NAME.western,
    textContent: CATEGORY_NAME.western,
  },
  {
    value: CATEGORY_NAME.asian,
    textContent: CATEGORY_NAME.asian,
  },
  {
    value: CATEGORY_NAME.etc,
    textContent: CATEGORY_NAME.etc,
  },
];

export const FILTER_SORT_BY_OPTIONS: SelectOption[] = [
  {
    value: 'name',
    textContent: '이름 순',
  },
  {
    value: 'distance',
    textContent: '거리 순',
  },
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
export const OPTION_START_INDEX = 1;
export const REQUEST_RASTAURANT_KEY = 'restaurants';
export const STAR_FILL_IMAGE_URL = './favorite-icon-filled.png';
export const STAR_LINE_IMAGE_URL = './favorite-icon-lined.png';
export const REQUEST_RESTAURANT_ID_KEY = 'restaurantId';
