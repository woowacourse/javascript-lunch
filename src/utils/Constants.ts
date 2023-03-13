export const CategoryImgPath: Readonly<{ [key: string]: string }> = {
  아시안: "category-asian.png",
  한식: "category-korean.png",
  양식: "category-western.png",
  중식: "category-chinese.png",
  일식: "category-japanese.png",
  기타: "category-etc.png",
};

export const OptionValue: Readonly<{ [key: string]: string }> = {
  TOTAL: "전체",
  NAME_ORDER: "이름순",
  TAKING_TIME_ORDER: "거리순",
  CHOICE: "선택해 주세요",
};

export const Constants: Readonly<{ [key: string]: string }> = {
  KOREAN: "ko-KR",
  TOTAL: "total",
  RESTAURANT_LIST: "restaurantList",
  CATEGORY_FILTER: "category-filter",
  SORTING_FILTER: "sorting-filter",
};

export const Selector: Readonly<{ [key: string]: string }> = {
  SELECT_FILTER_CONTAINER: ".restaurant-filter-container",
  SECTION: "section",
};

export const RestaurantSelect: Readonly<{ [key: string]: string[] }> = {
  CATEGORY: ["한식", "중식", "일식", "양식", "아시안", "기타"],
  SORTING: ["이름순", "거리순"],
  TAKING_TIME: ["5", "10", "15", "20", "30"],
};
