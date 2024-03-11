export type Category =
  | "한식"
  | "일식"
  | "아시안"
  | "양식"
  | "중식"
  | "전체"
  | "기타";

export type Distance = 5 | 10 | 15 | 20 | 30;

export interface RestaurantItem {
  name: string;
  category: Category;
  distance: Distance;
  description?: string;
  link?: string;
}
