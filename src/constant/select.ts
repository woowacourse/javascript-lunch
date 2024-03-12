import { Message, WalkingTime } from '../interface/Restaurant';

export const KOREAN_CATEGORY: Message = {
  한식: 'korean',
  중식: 'chinese',
  일식: 'japanese',
  양식: 'western',
  아시안: 'asian',
  기타: 'etc',
};

export const WALKING_TIME: readonly WalkingTime[] = [5, 10, 15, 20, 30];

export const categoryFilterList: readonly string[] = [
  '전체',
  '한식',
  '중식',
  '일식',
  '양식',
  '아시안',
  '기타',
];

export const sortingFilterLsit: readonly string[] = ['이름순', '거리순'];
