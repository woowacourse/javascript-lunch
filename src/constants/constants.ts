import { KeyOfCategory, KeyOfSortingKey } from '../types/types';

export const CATEGORY = {
  all: '전체',
  korean: '한식',
  chinese: '중식',
  japanese: '일식',
  asian: '아시안',
  western: '양식',
  etc: '기타'
} as const;

export const SORTING_KEY = {
  name: '이름순',
  distance: '거리순'
} as const;

export const FILTER_DATASET = {
  category: CATEGORY,
  sortingKey: SORTING_KEY
} as const;

export const DISTANCE = {
  '5': 5,
  '10': 10,
  '15': 15,
  '20': 20,
  '30': 30
} as const;

export const DEFAULT: {
  category: KeyOfCategory;
  sortingKey: KeyOfSortingKey;
} = {
  category: 'all',
  sortingKey: 'name'
} as const;
