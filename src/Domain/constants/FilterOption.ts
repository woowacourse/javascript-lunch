import { Category, SortOption } from '../types/FilterOptionType';

export const CATEGORY_LIST = [
  { value: '전체' as Category, label: '전체' },
  { value: '한식' as Category, label: '한식' },
  { value: '중식' as Category, label: '중식' },
  { value: '일식' as Category, label: '일식' },
  { value: '양식' as Category, label: '양식' },
  { value: '아시안' as Category, label: '아시안' },
  { value: '기타' as Category, label: '기타' },
] as const;

export const SORTING_LIST = [
  { value: 'name' as SortOption, label: '이름순' },
  { value: 'distance' as SortOption, label: '거리순' },
] as const;
