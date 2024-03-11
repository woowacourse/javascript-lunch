const CATEGORIES = ["한식", "중식", "일식", "아시안", "양식", "기타"] as const;

const CATEGORY_IMAGE_MAPPER = {
  한식: "category-korean.png",
  중식: "category-chinese.png",
  일식: "category-japanese.png",
  아시안: "category-asian.png",
  양식: "category-western.png",
  기타: "category-etc.png",
} as const;

const SORTING_STANDARDS = ["name", "distance"] as const;

const SORTING_STANDARD_MAPPER = {
  name: "이름순",
  distance: "거리순",
} as const;

const DISTANCES = [5, 10, 15, 20, 30] as const;

const DISTANCE_MAPPER = {
  5: "5분 내",
  10: "10분 내",
  15: "15분 내",
  20: "20분 내",
  30: "30분 내",
} as const;

const RESTAURANTS = "restaurants";

export {
  RESTAURANTS,
  CATEGORIES,
  CATEGORY_IMAGE_MAPPER,
  SORTING_STANDARDS,
  SORTING_STANDARD_MAPPER,
  DISTANCES,
  DISTANCE_MAPPER,
};
