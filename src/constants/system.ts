export const CATEGORIES = {
  ALL: "전체",
  KOREAN: "한식",
  CHINESE: "중식",
  JAPANESE: "일식",
  ASIAN: "아시안",
  WESTERN: "양식",
  OTHER: "기타",
};

export type CategoryValue = (typeof CATEGORIES)[keyof typeof CATEGORIES];

export const SORTS = {
  BYNAME: "이름순",
  BYDISTANCE: "거리순",
};
