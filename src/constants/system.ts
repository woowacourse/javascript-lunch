export const CATEGORIES = {
  KOREAN: "한식",
  CHINESE: "중식",
  JAPANESE: "일식",
  ASIAN: "아시안",
  WESTERN: "양식",
  OTHER: "기타",
};

export const ALL = "전체";

export type CategoryValue = (typeof CATEGORIES)[keyof typeof CATEGORIES];

export const SORTS = {
  BYNAME: "이름순",
  BYDISTANCE: "거리순",
};

export const SORT_VALUE = {
  BYNAME: "name",
  BYDISTANCE: "distance",
};

export const DISTANCES = {
  "5": "5분 내",
  "10": "10분 내",
  "15": "15분 내",
  "20": "20분 내",
  "30": "30분 내",
};
