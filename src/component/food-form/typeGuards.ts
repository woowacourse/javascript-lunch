import { CategoryType, DistanceType } from "../../types/food";

export function isCategoryType(category: string): category is CategoryType {
  const CATEGORY_VALUES = ["한식", "양식", "일식", "중식", "기타", "아시안"] as const;
  return CATEGORY_VALUES.includes(category as CategoryType);
}

export function isDistanceType(value: string): value is DistanceType {
  const DISTANCE_VALUES = ["5", "10", "15", "20", "30"] as const;
  return DISTANCE_VALUES.includes(value as DistanceType);
}
