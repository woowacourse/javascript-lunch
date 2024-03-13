import { CATEGORY } from "./category";
import { CategoryFilter, SortFilter } from "../types/Filter";

interface FilterItem {
  value: string;
  label: string;
}

export const RESTAURANT_DISPLAYING_FILTER: {
  [key in CategoryFilter]: CategoryFilter;
} = {
  ...CATEGORY,
  all: "all",
};

export const KOREAN_RESTAURANT_DISPLAYING_FILTER: FilterItem[] = [
  {
    value: RESTAURANT_DISPLAYING_FILTER.all,
    label: "전체",
  },
  {
    value: RESTAURANT_DISPLAYING_FILTER.korean,
    label: "한식",
  },
  {
    value: RESTAURANT_DISPLAYING_FILTER.chinese,
    label: "중식",
  },
  {
    value: RESTAURANT_DISPLAYING_FILTER.japanese,
    label: "일식",
  },
  {
    value: RESTAURANT_DISPLAYING_FILTER.western,
    label: "양식",
  },
  {
    value: RESTAURANT_DISPLAYING_FILTER.asian,
    label: "아시안",
  },
  {
    value: RESTAURANT_DISPLAYING_FILTER.etc,
    label: "기타",
  },
];

export const SORT_FILTER: {
  [key in SortFilter]: SortFilter;
} = {
  name: "name",
  timeToReach: "timeToReach",
};

export const KOREAN_SORT_FILTER: FilterItem[] = [
  {
    value: SORT_FILTER.name,
    label: "이름순",
  },
  {
    value: SORT_FILTER.timeToReach,
    label: "거리순",
  },
];
