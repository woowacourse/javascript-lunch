export const CATEGORY = {
  korean: "korean",
  chinese: "chinese",
  japanese: "japanese",
  western: "western",
  asian: "asian",
  etc: "etc",
} as const;

export const KOREAN_CATEGORY = {
  [CATEGORY.korean]: "한식",
  [CATEGORY.chinese]: "중식",
  [CATEGORY.japanese]: "일식",
  [CATEGORY.western]: "양식",
  [CATEGORY.asian]: "아시안",
  [CATEGORY.etc]: "기타",
} as const;
