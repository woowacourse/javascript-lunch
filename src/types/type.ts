export type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";

export type CategoryFilter = "전체" | Category;

export type SortedOption = "name" | "distance";

export type Distance = 5 | 10 | 15 | 20 | 30;

export interface Restaurant {
  id: string;
  category: Category;
  title: string;
  distance: Distance;
  description?: string;
  link?: string;
  isFavorite: boolean;
}
