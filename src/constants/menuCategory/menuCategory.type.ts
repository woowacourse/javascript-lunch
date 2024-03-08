import { MENU_CATEGORIES } from "./menuCategory";

export type MenuCategory =
  | "전체"
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "아시안"
  | "기타";

export type MenuCategoryWithoutAll = Exclude<
  MenuCategory,
  typeof MENU_CATEGORIES.all
>;

export type MenuCategoryKey =
  | "all"
  | "korean"
  | "chinese"
  | "japanese"
  | "western"
  | "asian"
  | "others";
