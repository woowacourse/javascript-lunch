import { Object } from "@/type/type";

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
  NAME_ORDER: "이름순",
  DISTANCE_ORDER: "거리순",
};

export const Constants: Readonly<Object> = {
  RESTAURANT_LIST: "restuarantList",
  KOREAN: "ko-KR",
  CATEGORY_FILTER: "category-filter",
  SORTING_FILTER: "sorting-filter",
};
