const _categoryFilterOptions = {
  전체: "",
  한식: "한식",
  중식: "중식",
  일식: "일식",
  양식: "양식",
  아시안: "아시안",
  기타: "기타",
} as const;

const _sortFilterOptions = {
  이름순: "name",
  거리순: "distance",
} as const;

export const categoryFilterOptions = Object.freeze(_categoryFilterOptions) satisfies Record<string, string>;
export const sortFilterOptions = Object.freeze(_sortFilterOptions) satisfies Record<string, string>;