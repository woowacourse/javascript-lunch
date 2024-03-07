import { CATEGORY } from "./category";
import { CategoryFilter, SortFilter } from "../types/Filter";

export const RESTAURANT_DISPLAYING_FILTER: {
  [key in CategoryFilter]: CategoryFilter;
} = {
  ...CATEGORY,
  all: "all",
};

export const KOREAN_RESTAURANT_DISPLAYING_FILTER: {
  [key: string]: string;
} = {
  [RESTAURANT_DISPLAYING_FILTER.all]: "전체",
  [RESTAURANT_DISPLAYING_FILTER.korean]: "한식",
  [RESTAURANT_DISPLAYING_FILTER.chinese]: "중식",
  [RESTAURANT_DISPLAYING_FILTER.japanese]: "일식",
  [RESTAURANT_DISPLAYING_FILTER.western]: "양식",
  [RESTAURANT_DISPLAYING_FILTER.asian]: "아시안",
  [RESTAURANT_DISPLAYING_FILTER.etc]: "기타",
};

export const SORT_FILTER: {
  [key in SortFilter]: SortFilter;
} = {
  name: "name",
  timeToReach: "timeToReach",
};

export const KOREAN_SORT_FILTER: {
  [key: string]: string;
} = {
  [SORT_FILTER.name]: "이름순",
  [SORT_FILTER.timeToReach]: "거리순",
};
