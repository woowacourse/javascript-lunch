export type MenuCategory =
  | "전체"
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "아시안"
  | "기타";

export type MenuCategoryKey =
  | "all"
  | "korean"
  | "chinese"
  | "japanese"
  | "western"
  | "asian"
  | "others";

export type MenuCategoryDictionary = Record<MenuCategoryKey, MenuCategory>;
