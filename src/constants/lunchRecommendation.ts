import { Values } from '../types/common';

export const CATEGORY = Object.freeze({
  ALL: '전체',
  KOREAN: '한식',
  CHINESE: '중식',
  JAPANESE: '일식',
  WESTERN: '양식',
  ASIAN: '아시안',
  ETC: '기타',
});

export const SORT_OPTIONS = Object.freeze({
  DISTANCE: '거리순',
  NAME: '이름순',
});

export const MAX_NAME_LENGTH = 20;
export const MAX_DESCRIPTION_LENGTH = 50;

export type Category = Values<typeof CATEGORY>;
export type SortOption = Values<typeof SORT_OPTIONS>;
