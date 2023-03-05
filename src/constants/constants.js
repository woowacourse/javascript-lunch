import { deepFreeze } from '../utils/common';

export const VALUE = deepFreeze({
  catgory: {
    all: '전체',
  },

  sortType: {
    nameOrder: 'name',
  },
});

export const CATEGORY_TO_FILENAME = Object.freeze({
  한식: 'category-korean',
  중식: 'category-chinese',
  일식: 'category-japanese',
  양식: 'category-western',
  아시안: 'category-asian',
  기타: 'category-etc',
});
