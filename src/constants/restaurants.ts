import { Values } from '../types/common';

export const META_CATEGORY = Object.freeze({
  KOREAN: '한식',
  CHINESE: '중식',
  JAPANESE: '일식',
  WESTERN: '양식',
  ASIAN: '아시안',
  ETC: '기타',
});

export const META_DISTANCE = Object.freeze({
  5: '5분 내',
  10: '10분 내',
  15: '15분 내',
  20: '20분 내',
  30: '30분 내',
});

export const MIN_REQUIRED_LENGTH = 1;
export const MIN_NAME_LENGTH = 1;
export const MAX_NAME_LENGTH = 10;

export type MetaCategory = Values<typeof META_CATEGORY>;
export type MetaDistance = Values<typeof META_DISTANCE>;
