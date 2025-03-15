export const categories = [
  "한식",
  "중식",
  "일식",
  "아시안",
  "양식",
  "기타",
] as const;

export type Category = (typeof categories)[number];

export const distances = [5, 10, 15, 20, 25, 30] as const;
export type Distance = (typeof distances)[number];

export type RestaurantItem = {
  id: number;
  storeName: string;
  distance: Distance;
  category: Category;
  description?: string;
  link?: string;
  isFavorite?: boolean;
};
