export const LIST = "list";

export const CATEGORY = {
  ALL: "전체",
  KOREAN: "한식",
  CHINESE: "중식",
  JAPANESE: "일식",
  ASIAN: "아시안",
  WESTERN: "양식",
  ETC: "기타",
} as const;

export const CATEGORY_LOWER_CASE = Object.fromEntries(
  Object.entries(CATEGORY).map(([key, value]) => [key, key.toLowerCase()])
);

export const translateCategory = Object.fromEntries(
  Object.entries(CATEGORY).map(([key, value]) => [value, key.toLowerCase()])
);

export const SORTINGWAY = {
  NAME: "name",
  DISTANCE: "distance",
};
