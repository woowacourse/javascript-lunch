import { FILTER_OPTION_INTERFACE } from '../type';

export const FILTER_ID = {
  CATEGORY: 'category-filter',
  SORTING: 'sorting-filter',
};

export const FILTER_NAME = {
  CATEGORY: 'category',
  SORTING: 'sorting',
};

export const FILTER_CLASS = 'restaurant-SELECT';

export const SELECT_OPTION_LIST = {
  CATEGORY: [
    { value: '전체', text: '전체' },
    { value: '한식', text: '한식' },
    { value: '중식', text: '중식' },
    { value: '일식', text: '일식' },
    { value: '양식', text: '양식' },
    { value: '아시안', text: '아시안' },
    { value: '기타', text: '기타' },
  ],
  SORTING: [
    { value: 'name', text: '이름순' },
    { value: 'distance', text: '거리순' },
  ],
};

export const FILTER_OPTION: FILTER_OPTION_INTERFACE = {
  NAME: 'name',
  DISTANCE: 'distance',
  ALL_CATEGORIES: '전체',
};
