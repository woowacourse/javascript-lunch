// TODO: 배열 중복되는 부분 어떻게 줄일지 생각해보기 (ex 함수로 묶기)

import type { CategoryOption, SortOption } from "../types/option";
import type { Category, Distance } from "../types/restaurant";

export const CATEGORY_FILTER_OPTIONS: readonly CategoryOption[] = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];

const SORTING_FILTER_OPTIONS = ["이름순", "거리순"] as const;

export const SORTING_FILTER_VALUES: readonly SortOption[] = [
  "name",
  "distance",
];

const CATEGORY_OPTIONS = [
  "선택해 주세요",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
] as const;

const CATEGORY_OPTION_VALUES: readonly (Category | "")[] = [
  "",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];

const DISTANCE_OPTIONS = [
  "선택해 주세요",
  "5분 내",
  "10분 내",
  "15분 내",
  "20분 내",
  "30분 내",
] as const;

const DISTANCE_OPTION_VALUES: readonly (Distance | "")[] = [
  "",
  5,
  10,
  15,
  20,
  30,
];

const OPTIONS = {
  "category-filter": {
    text: CATEGORY_FILTER_OPTIONS,
    value: CATEGORY_FILTER_OPTIONS,
  },
  "sorting-filter": {
    text: SORTING_FILTER_OPTIONS,
    value: SORTING_FILTER_VALUES,
  },
  category: {
    text: CATEGORY_OPTIONS,
    value: CATEGORY_OPTION_VALUES,
  },
  distance: {
    text: DISTANCE_OPTIONS,
    value: DISTANCE_OPTION_VALUES,
  },
} as const;

export default OPTIONS;
