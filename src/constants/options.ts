// TODO: 배열 중복되는 부분 어떻게 줄일지 생각해보기 (ex 함수로 묶기)

export const CATEGORY_FILTER_OPTIONS = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
] as const;

export const SORTING_FILTER_OPTIONS = ["이름순", "거리순"] as const;

export const CATEGORY_OPTIONS = [
  "선택해 주세요",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
] as const;

export const DISTANCE_OPTIONS = [
  "선택해 주세요",
  "5분 내",
  "10분 내",
  "15분 내",
  "20분 내",
  "30분 내",
] as const;

export const DISTANCE_OPTION_VALUES = [5, 10, 15, 20, 30];

export const OPTIONS = {
  "category-filter": {
    text: CATEGORY_FILTER_OPTIONS,
    value: CATEGORY_FILTER_OPTIONS,
  },
  "sorting-filter": {
    text: SORTING_FILTER_OPTIONS,
    value: SORTING_FILTER_OPTIONS,
  },
  category: {
    text: CATEGORY_OPTIONS,
    value: CATEGORY_OPTIONS,
  },
  distance: {
    text: DISTANCE_OPTIONS,
    value: DISTANCE_OPTION_VALUES,
  },
} as const;
