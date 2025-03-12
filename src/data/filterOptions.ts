export const categoryFilterOptions: Record<string, string> = {
  전체: "",
  한식: "한식",
  중식: "중식",
  일식: "일식",
  양식: "양식",
  아시안: "아시안",
  기타: "기타",
} as const;

export const sortFilterOptions: Record<string, string> = {
  이름순: "name",
  거리순: "distance",
} as const;
