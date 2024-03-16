import { CATEGORY } from './restaurant';

export const SORTING_KEY = {
  name: '이름순',
  distance: '거리순'
} as const;

export const FILTER_OPTIONS = {
  category: { all: '전체', ...CATEGORY },
  sortingKey: SORTING_KEY
} as const;
