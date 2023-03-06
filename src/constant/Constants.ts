import { Category, Object } from "@/type/type";

export const CategoryImgPath: Readonly<Object> = {
  아시안: "category-asian.png",
  한식: "category-korean.png",
  양식: "category-western.png",
  중식: "category-chinese.png",
  일식: "category-japanese.png",
  기타: "category-etc.png",
};

export const OptionValue: Readonly<Object> = {
  TOTAL: "전체",
  PLACE_HOLDER: "선택해 주세요.",
  NAME_ORDER: "이름순",
  DISTANCE_ORDER: "거리순",
};

export const Constants: Readonly<Object> = {
  RESTAURANT_LIST: "restuarantList",
  KOREAN: "ko-KR",
  CATEGORY_FILTER: "category-filter",
  SORTING_FILTER: "sorting-filter",
};

export const CATEGORY: Category[] = [
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];

export const SORTING = ["이름순", "거리순"];
export const TAKING_TIME = ["5", "10", "15", "20", "30"];
