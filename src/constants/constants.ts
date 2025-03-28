export const ERROR_MESSAGE = {
  restaurantNameMinLength: "이름은 최소 1글자 이상 가능합니다.",
  restaurantNameMaxLength: "이름은 최대 20글자까지 가능합니다.",
  duplicateRestaurantName: "기존에 있는 식당과 중복된 이름입니다.",
  emptyCategory: "카테고리를 선택해주세요.",
  emptyDistance: "거리를 선택해주세요.",
  descriptionMaxLength: "설명은 최대 500글자까지 가능합니다.",
};

export const IMAGE_SRC_BY_RESTAURANTS_CATEGORY = {
  전체: "",
  한식: "images/category-korean.png",
  중식: "images/category-chinese.png",
  일식: "images/category-japanese.png",
  양식: "images/category-western.png",
  아시안: "images/category-asian.png",
  기타: "images/category-etc.png",
};

export const VALIDATE_SETTINGS = {
  nameMinLength: 1,
  nameMaxLength: 20,
  descriptionMaxLength: 500,
};

export const CATEGORY_OPTIONS = [
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];

export const DISTANCE_OPTIONS = ["5", "10", "15", "20", "30"];
