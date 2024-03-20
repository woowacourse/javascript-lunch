export const SORT_STANDARD: SortStandard[] = ["이름순", "거리순"];

export const CATEGORY: Category[] = [
  "한식",
  "중식",
  "일식",
  "아시안",
  "양식",
  "기타",
];

export const CATEGORY_WITH_ENTIRE: CategoryWithEntire[] = ["전체", ...CATEGORY];

export const DISTANCE: Distance[] = [5, 10, 15, 20, 30];

export const CATEGORY_FILTER_NAME = "category";
export const SORT_STANDARD_FILTER_NAME = "sorting";

export const CATEGORY_FILTER_DEFAULT__VALUE = CATEGORY_WITH_ENTIRE[0];
export const SORT_STANDARD_FILTER_DEFAULT_VALUE = SORT_STANDARD[0];

export const DEFAULT_UNSELECTED_OPTION = "선택해주세요";

export const isCategory = (value: string): value is Category => {
  return CATEGORY.includes(value as Category);
};

export const isDistance = (value: number): value is Distance => {
  return DISTANCE.includes(value as Distance);
};
