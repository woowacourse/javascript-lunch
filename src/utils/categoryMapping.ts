import { Category, CategoryName } from "../../types/Restaurant.ts";

type ExtendedCategoryName = CategoryName | '에러';
type CategoryCode = Category | 'error_category';

export const categoryMapping : Record<ExtendedCategoryName,CategoryCode> = {
  한식: "korean",
  중식: "chinese",
  일식: "japanese",
  양식: "western",
  아시안: "asian",
  기타: "etc",
  에러: "error_category",
};

