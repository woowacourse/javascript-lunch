<<<<<<< HEAD
export const VALUE = {
  catgory: {
    all: '전체',
  },

  sortType: {
    nameOrder: 'name',
  },
};

export const CATEGORY_TO_FILENAME = {
=======
import { CategoryValue } from '../types/Types';

export const CATEGORY_ALL: string = '전체';
export const SORT_BY_NAMEORDER: string = 'name';

export const CATEGORY_TO_FILENAME: Readonly<Record<CategoryValue, string>> = {
  전체: 'category-all',
>>>>>>> step2-test
  한식: 'category-korean',
  중식: 'category-chinese',
  일식: 'category-japanese',
  양식: 'category-western',
  아시안: 'category-asian',
  기타: 'category-etc',
};
