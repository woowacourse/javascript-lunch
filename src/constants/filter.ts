import { CATEGORY, KOREAN_CATEGORY } from "./category";

export const CATEGORY_FILTER = {
  ...CATEGORY,
  all: "all",
} as const;

export const KOREAN_CATEGORY_FILTER = {
  ...KOREAN_CATEGORY,
  all: "전체",
} as const;

export const SORT_FILTER = {
  name: "name",
  timeToReach: "timeToReach",
} as const;

export const KOREAN_SORT_FILTER = {
  [SORT_FILTER.name]: "이름순",
  [SORT_FILTER.timeToReach]: "거리순",
} as const;
