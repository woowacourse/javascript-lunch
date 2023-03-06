export const Category = [
  '한식',
  '중식',
  '일식',
  '아시안',
  '양식',
  '기타',
] as const;
export const Filter = ['이름순', '거리순'] as const;
export type DistanceTime = 5 | 10 | 15 | 20 | 30;
export type FilterOptions = (typeof Filter)[number];
export type CategoryOptions = (typeof Category)[number] | '전체';
