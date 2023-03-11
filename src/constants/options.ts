const CATEGORY_FILTER_OPTION = {
  전체: "전체",
  한식: "한식",
  중식: "중식",
  일식: "일식",
  양식: "양식",
  아시안: "아시안",
  기타: "기타",
} as const;

const SORTING_FILTER_OPTION = {
  이름순: "name",
  거리순: "distance",
} as const;

const CATEGORY_OPTION = {
  "선택해 주세요": "",
  한식: "한식",
  중식: "중식",
  일식: "일식",
  양식: "양식",
  아시안: "아시안",
  기타: "기타",
} as const;

const DISTANCE_OPTION = {
  "선택해 주세요": "",
  "5분 내": 5,
  "10분 내": 10,
  "15분 내": 15,
  "20분 내": 20,
  "30분 내": 30,
} as const;

const OPTIONS = {
  "category-filter": CATEGORY_FILTER_OPTION,
  "sorting-filter": SORTING_FILTER_OPTION,
  category: CATEGORY_OPTION,
  distance: DISTANCE_OPTION,
} as const;

export default OPTIONS;
