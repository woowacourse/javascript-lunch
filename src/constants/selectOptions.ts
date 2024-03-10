export const CATEGORY_WITH_ENTIRE: CategoryWithEntire[] = [
  "전체",
  "한식",
  "중식",
  "일식",
  "아시안",
  "양식",
  "기타",
];

export const SORT_STANDARD: SortStandard[] = ["이름순", "거리순"];

export const CATEGORY: Category[] = [
  "한식",
  "중식",
  "일식",
  "아시안",
  "양식",
  "기타",
];

export const DISTANCE: Distance[] = [5, 10, 15, 20, 30];

export const DEFAULT_UNSELECTED_OPTION = "선택해주세요";

export const isCategory = (value: string): value is Category => {
  return ["한식", "중식", "일식", "아시안", "양식", "기타"].includes(value);
};

export const isDistance = (value: number): value is Distance => {
  return [5, 10, 15, 20, 30].includes(value);
};
