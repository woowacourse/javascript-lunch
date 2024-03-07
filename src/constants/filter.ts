import { CategoryFilter, SortFilter } from "../types/Filter";

export const CATEGORY_FILTER: {
  [key in CategoryFilter]: CategoryFilter;
} = {
  all: "all",
  korean: "korean",
  chinese: "chinese",
  japanese: "japanese",
  western: "western",
  asian: "asian",
  etc: "etc",
};

export const KOREAN_CATEGORY_FILTER: {
  [key: string]: string;
} = {
  [CATEGORY_FILTER.all]: "전체",
  [CATEGORY_FILTER.korean]: "한식",
  [CATEGORY_FILTER.chinese]: "중식",
  [CATEGORY_FILTER.japanese]: "일식",
  [CATEGORY_FILTER.western]: "양식",
  [CATEGORY_FILTER.asian]: "아시안",
  [CATEGORY_FILTER.etc]: "기타",
};

export const SORT_FILTER: {
  [key in SortFilter]: SortFilter;
} = {
  name: "name",
  timeToReach: "timeToReach",
};

export const KOREAN_SORT_FILTER: {
  [key: number]: string;
} = {
  [SORT_FILTER.name]: "이름순",
  [SORT_FILTER.timeToReach]: "거리순",
};
