import { Category, Distance } from '../types';

export const CHARACTER_LIMIT = {
  name: 10,
  description: 150,
  link: 2000,
};

export const CATEGORY = {
  korean: 'korean',
  japanese: 'japanese',
  western: 'western',
  asian: 'asian',
  chinese: 'chinese',
  etc: 'etc',
} as const;

const CATEGORY_KOR: { [key in Category]: string } = {
  korean: '한식',
  japanese: '일식',
  western: '양식',
  asian: '아시안',
  chinese: '중식',
  etc: '기타',
};

export const CATEGORY_OPTIONS: { value: Category; text: string }[] = [
  { value: CATEGORY.korean, text: CATEGORY_KOR.korean },
  { value: CATEGORY.chinese, text: CATEGORY_KOR.chinese },
  { value: CATEGORY.japanese, text: CATEGORY_KOR.japanese },
  { value: CATEGORY.western, text: CATEGORY_KOR.western },
  { value: CATEGORY.asian, text: CATEGORY_KOR.asian },
  { value: CATEGORY.etc, text: CATEGORY_KOR.etc },
];

export const PROTOCOL = {
  http: 'http',
  https: 'https',
} as const;

export const DISTANCES: Distance[] = [5, 10, 15, 20, 30];
