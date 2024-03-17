import { CategoryValues } from '../types/types';

export const CATEGORY = {
  all: '전체',
  korean: '한식',
  chinese: '중식',
  japanese: '일식',
  western: '양식',
  asian: '아시안',
  etc: '기타'
} as const;

export const SORTING = {
  name: '이름순',
  distance: '거리순'
} as const;

export const CATEGORY_VALUES: CategoryValues[] = [
  '전체',
  '한식',
  '중식',
  '일식',
  '양식',
  '아시안',
  '기타'
];
