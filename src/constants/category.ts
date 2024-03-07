import { Category } from "../types/Category";

export const CATEGORY: {
  [key in Category]: Category;
} = {
  korean: "korean",
  chinese: "chinese",
  japanese: "japanese",
  western: "western",
  asian: "asian",
  etc: "etc",
};

export const KOREAN_CATEGORY: {
  [key: string]: string;
} = {
  [CATEGORY.korean]: "한식",
  [CATEGORY.chinese]: "중식",
  [CATEGORY.japanese]: "일식",
  [CATEGORY.western]: "양식",
  [CATEGORY.asian]: "아시안",
  [CATEGORY.etc]: "기타",
};
