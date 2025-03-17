export type CategoryType =
  | "KOREAN"
  | "CHINESE"
  | "JAPANESE"
  | "WESTERN"
  | "ASIAN"
  | "ETC";

export const CATEGORY_META: Record<CategoryType | "ALL", string> = {
  ALL: "전체",
  KOREAN: "한식",
  CHINESE: "중식",
  JAPANESE: "일식",
  WESTERN: "양식",
  ASIAN: "아시안",
  ETC: "기타",
} as const;

export type SortByType = "NAME" | "DISTANCE";
export const SORTBY: Record<SortByType, string> = {
  NAME: "이름",
  DISTANCE: "거리",
};

export type TabKey = "ALL" | "FAVORITE";
export const TAB: Record<TabKey, string> = {
  ALL: "전체",
  FAVORITE: "즐겨찾기",
};
