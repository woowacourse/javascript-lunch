import { SortingOption } from './types';

const sortingOptionKeys = [
  'name',
  'distance',
  '한식',
  '중식',
  '일식',
  '양식',
  '아시안',
  '기타',
  '전체',
];

export const isSortingOption = (sortingOption: unknown): sortingOption is SortingOption => {
  const value = sortingOption as SortingOption;

  return sortingOptionKeys.includes(value);
};
