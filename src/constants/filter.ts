import { KeyOfCategoryKey, KeyOfSortingKey } from '../types/filter';
import { CATEGORY } from './restaurant';

export const SORTING_KEY = {
  name: '이름순',
  distance: '거리순'
} as const;

export const FILTER_OPTIONS = {
  categoryKey: { all: '전체', ...CATEGORY },
  sortingKey: SORTING_KEY
} as const;

interface I_DEFAULT_KEY {
  categoryKey: KeyOfCategoryKey;
  sortingKey: KeyOfSortingKey;
}
export const DEFAULT_KEY: I_DEFAULT_KEY = {
  categoryKey: 'all',
  sortingKey: 'name'
} as const;
