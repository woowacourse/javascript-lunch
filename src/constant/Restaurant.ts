import { Category, Object, SelectAttribute } from "@/type/type";

export const CategoryImgPath: Readonly<Object> = {
  아시안: "category-asian.png",
  한식: "category-korean.png",
  양식: "category-western.png",
  중식: "category-chinese.png",
  일식: "category-japanese.png",
  기타: "category-etc.png",
};

export const StarImgPath: Readonly<Object> = {
  FILLED_STAR: "favorite-icon-filled.png",
  EMPTY_STAR: "favorite-icon-lined.png",
};

export const OptionValue: Readonly<Object> = {
  TOTAL: "전체",
  PLACE_HOLDER: "선택해 주세요.",
  NAME_ORDER: "이름순",
  DISTANCE_ORDER: "거리순",
};

export const Constants: Readonly<Object> = {
  RESTAURANT_LIST: "restaurantList",
  KOREAN: "ko-KR",
  CATEGORY_FILTER: "category-filter",
  SORTING_FILTER: "sorting-filter",
  EVERY_PAGE: "every",
  BOOKMARKED_PAGE: "bookmarked",
};

export const ErrorName: Readonly<Object> = {
  NAME: "name",
  TAKING_TIME: "taking_time",
  CATEGORY: "category",
};
