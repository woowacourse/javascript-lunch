import { Restaurant } from "../../types/restaurant.js";

export const ERROR_MESSAGE = {
  restaurantNameMaxLength: "이름은 최대 20글자까지 가능합니다.",
  duplicateRestaurantName: "기존에 있는 식당과 중복된 이름입니다.",
  descriptionMaxLength: "설명은 최대 500글자까지 가능합니다.",
} as const;

export const IMAGE_SRC_BY_RESTAURANTS_CATEGORY: Record<
  Restaurant["category"],
  string
> = {
  한식: "images/category-korean.png",
  중식: "images/category-chinese.png",
  일식: "images/category-japanese.png",
  양식: "images/category-western.png",
  아시안: "images/category-asian.png",
  기타: "images/category-etc.png",
};

export const CATEGORIES: Restaurant["category"][] = [
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];
export const DISTANCES: Restaurant["distance"][] = [5, 10, 15, 20, 30];
