import { Category } from "../types/Category";

interface CategoryItem {
  value: keyof typeof CATEGORY;
  label: string;
}

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

export const KOREAN_CATEGORY: CategoryItem[] = [
  {
    value: CATEGORY.korean,
    label: "한식",
  },
  {
    value: CATEGORY.chinese,
    label: "중식",
  },
  {
    value: CATEGORY.japanese,
    label: "일식",
  },
  {
    value: CATEGORY.western,
    label: "양식",
  },
  {
    value: CATEGORY.asian,
    label: "아시안",
  },
  {
    value: CATEGORY.etc,
    label: "기타",
  },
];
