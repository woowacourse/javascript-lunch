import { FOOD_CATEGORY_VALUES } from "./category";
export const DICTIONARY = {
  name: "이름",
  distance: "거리",
  all: "모든 음식점",
  favorite: "자주 가는 음식점",
  전체: "전체",
  ...FOOD_CATEGORY_VALUES.reduce((acc, cur) => {
    return { ...acc, [cur]: cur };
  }, {} as Record<string, string>),
} as const;
