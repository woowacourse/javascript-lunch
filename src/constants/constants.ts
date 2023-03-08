import { CategoryValue } from '../types/Types';

export const CATEGORY_ALL: string = '전체';
export const SORT_BY_NAMEORDER: string = 'name';

export const CATEGORY_TO_FILENAME: Readonly<Record<CategoryValue, string>> = {
  전체: 'category-all',
  한식: 'category-korean',
  중식: 'category-chinese',
  일식: 'category-japanese',
  양식: 'category-western',
  아시안: 'category-asian',
  기타: 'category-etc',
};
