export const CATEGORIES = ['한식', '중식', '일식', '양식', '아시안', '기타'] as const;
export const SORTS = ['이름순', '거리순'] as const;
export const DISTANCE_TIME = [5, 10, 15, 20, 30] as const;

export type Category = (typeof CATEGORIES)[number];
export type DistanceTime = (typeof DISTANCE_TIME)[number];
export type Sort = (typeof SORTS)[number];

export const SELECT_DISTANCE = [
  { value: '', text: '선택해 주세요' },
  { value: '5', text: '5분 내' },
  { value: '10', text: '10분 내' },
  { value: '15', text: '15분 내' },
  { value: '20', text: '20분 내' },
  { value: '30', text: '30분 내' },
];
